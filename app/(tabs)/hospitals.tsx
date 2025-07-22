import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import { useCallback, useEffect, useRef, useState } from "react";
import { 
  ActivityIndicator, 
  Alert, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity,
  RefreshControl 
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HospitalAPI } from "../../api/hospitalApi";
import AppLayout from "../../components/AppLayout";
import HospitalBottomSheet from "../../components/HospitalBottomSheet";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Colors } from "../../constants/Colors";
import { SharedStyles } from "../../constants/SharedStyles";
import { Hospital, Location } from "../../types/hospitalType";

export default function HospitalsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Load all hospitals on component mount
  const loadAllHospitals = useCallback(async () => {
    try {
      setLoading(true);
      const hospitals = await HospitalAPI.getAllHospitals();
      setAllHospitals(hospitals);
      setHospitals(hospitals);
    } catch (error) {
      console.error("Error loading hospitals:", error);
      Alert.alert("Error", "Failed to load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user's current location
  const getCurrentLocation = useCallback(async () => {
    try {
      setLocationLoading(true);
      const location = await HospitalAPI.getCurrentLocation();
      setUserLocation(location);

      // Fetch nearby hospitals
      const nearbyHospitals = await HospitalAPI.getNearbyHospitals(location);
      setHospitals(nearbyHospitals);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to get your location. Please check your location permissions and try again."
      );
    } finally {
      setLocationLoading(false);
    }
  }, []);

  // Search hospitals
  const searchHospitals = useCallback(async () => {
    if (!searchQuery.trim()) {
      setHospitals(allHospitals);
      return;
    }

    try {
      const searchResults = await HospitalAPI.searchHospitals(searchQuery, userLocation || undefined);
      setHospitals(searchResults);
    } catch (error) {
      console.error("Error searching hospitals:", error);
      Alert.alert("Search Error", "Unable to search hospitals. Please try again.");
    }
  }, [searchQuery, userLocation, allHospitals]);

  // Handle marker press
  const handleMarkerPress = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital);
    bottomSheetRef.current?.present();
  }, []);

  // Handle hospital card press
  const handleHospitalPress = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital);
    bottomSheetRef.current?.present();
  }, []);

  // Handle get directions
  const handleGetDirections = useCallback(async (hospital: Hospital) => {
    try {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.latitude},${hospital.coordinates.longitude}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open maps application");
      }
    } catch (error) {
      console.error("Error opening directions:", error);
      Alert.alert("Error", "Unable to open directions");
    }
  }, []);

  // Handle call hospital
  const handleCallHospital = useCallback(async (phone: string) => {
    try {
      const url = `tel:${phone}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to make phone call");
      }
    } catch (error) {
      console.error("Error calling hospital:", error);
      Alert.alert("Error", "Unable to make phone call");
    }
  }, []);

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAllHospitals();
    setRefreshing(false);
  }, [loadAllHospitals]);

  // Initialize on component mount
  useEffect(() => {
    loadAllHospitals();
  }, [loadAllHospitals]);

  // Search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(searchHospitals, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchHospitals]);

  // Render hospital card for list view
  const renderHospitalCard = ({ item }: { item: Hospital }) => (
    <TouchableOpacity
      style={[SharedStyles.card, styles.hospitalCard]}
      onPress={() => handleHospitalPress(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName}>{item.name}</Text>
          <Text style={styles.hospitalAddress}>{item.address}</Text>
          <Text style={styles.hospitalPhone}>{item.phone}</Text>
        </View>
        <View style={styles.hospitalMeta}>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.light.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
          <Text style={styles.waitTime}>{item.waitTime}</Text>
        </View>
      </View>
      
      <View style={styles.specialtiesContainer}>
        {item.specialties.slice(0, 3).map((specialty, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
        {item.specialties.length > 3 && (
          <Text style={styles.moreSpecialties}>+{item.specialties.length - 3} more</Text>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCallHospital(item.phone)}
        >
          <Ionicons name="call" size={16} color={Colors.light.primary} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleGetDirections(item)}
        >
          <Ionicons name="navigate" size={16} color={Colors.light.primary} />
          <Text style={styles.actionText}>Directions</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalProvider>
      <AppLayout useScrollView={false}>
        <View style={styles.header}>
          <Text style={SharedStyles.title}>Find Hospitals</Text>
          <Text style={SharedStyles.subtitle}>
            Locate medical facilities near you for immediate care
          </Text>
        </View>

        <View style={styles.controlsContainer}>
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search hospitals..."
              icon="search"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={locationLoading ? "Loading..." : "My Location"}
              variant="secondary"
              onPress={getCurrentLocation}
              style={styles.locationButton}
              disabled={locationLoading}
            />
            <Button
              title={viewMode === 'map' ? 'List' : 'Map'}
              variant="primary"
              onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
              style={styles.viewButton}
            />
          </View>
        </View>

        {userLocation && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>📍 Current Location</Text>
            <Text style={styles.address}>{userLocation.address}</Text>
          </View>
        )}

        {viewMode === 'map' ? (
          <View style={styles.mapContainer}>
            {userLocation ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                {/* User location marker */}
                <Marker
                  coordinate={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  }}
                  title="Your Location"
                  description="You are here"
                  pinColor={Colors.light.primary}
                />

                {/* Hospital markers */}
                {hospitals.map((hospital) => (
                  <Marker
                    key={hospital.id}
                    coordinate={{
                      latitude: hospital.coordinates.latitude,
                      longitude: hospital.coordinates.longitude,
                    }}
                    title={hospital.name}
                    description={hospital.address}
                    onPress={() => handleMarkerPress(hospital)}
                  >
                    <View style={styles.markerContainer}>
                      <View style={styles.markerIcon}>
                        <Ionicons name="medical" size={16} color="#fff" />
                      </View>
                    </View>
                  </Marker>
                ))}
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>
                  Tap "My Location" to see hospitals on map
                </Text>
              </View>
            )}
          </View>
        ) : (
          <FlatList
            data={hospitals}
            renderItem={renderHospitalCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                {loading ? (
                  <ActivityIndicator size="large" color={Colors.light.primary} />
                ) : (
                  <>
                    <Text style={styles.emptyStateText}>
                      {searchQuery ? 'No hospitals found matching your search' : 'No hospitals available'}
                    </Text>
                    {searchQuery && (
                      <Button
                        title="Clear Search"
                        variant="secondary"
                        onPress={() => setSearchQuery('')}
                        style={styles.clearButton}
                      />
                    )}
                  </>
                )}
              </View>
            }
            ListHeaderComponent={
              <Text style={styles.resultsCount}>
                {hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''} found
              </Text>
            }
          />
        )}

        <HospitalBottomSheet
          ref={bottomSheetRef}
          hospital={selectedHospital}
          onGetDirections={handleGetDirections}
          onCall={handleCallHospital}
        />
      </AppLayout>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  controlsContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  locationButton: {
    flex: 1,
  },
  viewButton: {
    minWidth: 80,
  },
  locationInfo: {
    backgroundColor: Colors.light.blue[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: Colors.light.gray[500],
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.gray[100],
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: Colors.light.gray[500],
    textAlign: "center",
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  hospitalCard: {
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: Colors.light.gray[600],
    marginBottom: 2,
  },
  hospitalPhone: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  hospitalMeta: {
    alignItems: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 4,
  },
  waitTime: {
    fontSize: 12,
    color: Colors.light.gray[500],
    backgroundColor: Colors.light.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: Colors.light.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  moreSpecialties: {
    fontSize: 12,
    color: Colors.light.gray[500],
    alignSelf: "center",
    marginTop: 4,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.light.gray[100],
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
  },
  actionText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
    marginLeft: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.light.gray[500],
    marginBottom: 16,
    textAlign: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.gray[500],
    textAlign: "center",
    marginBottom: 16,
  },
  clearButton: {
    minWidth: 120,
  },
  markerContainer: {
    alignItems: "center",
  },
  markerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
