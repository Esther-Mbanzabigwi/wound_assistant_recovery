import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
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
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [locationLoading, setLocationLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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
    if (!userLocation || !searchQuery.trim()) return;

    try {
      const searchResults = await HospitalAPI.searchHospitals(
        searchQuery,
        userLocation
      );
      setHospitals(searchResults);
    } catch (error) {
      console.error("Error searching hospitals:", error);
      Alert.alert(
        "Search Error",
        "Unable to search hospitals. Please try again."
      );
    }
  }, [searchQuery, userLocation]);

  // Handle marker press
  const handleMarkerPress = useCallback((hospital: Hospital) => {
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

  // Initialize location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // // Search when query changes
  // useEffect(() => {
  //   if (searchQuery.trim()) {
  //     const timeoutId = setTimeout(searchHospitals, 500);
  //     return () => clearTimeout(timeoutId);
  //   } else if (userLocation) {
  //     // Reset to nearby hospitals when search is cleared
  //     HospitalAPI.getNearbyHospitals(userLocation).then(setHospitals);
  //   }
  // }, [searchQuery, searchHospitals, userLocation]);

  return (
    <BottomSheetModalProvider>
      <AppLayout>
        <View style={styles.header}>
          <Text style={SharedStyles.title}>Find Nearby Hospitals</Text>
          <Text style={SharedStyles.subtitle}>
            Locate medical facilities near you for immediate care
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Input
            placeholder="Search hospitals"
            icon="search"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button
            title={locationLoading ? "Loading..." : "Use My Location"}
            variant="primary"
            onPress={getCurrentLocation}
            style={styles.locationButton}
            disabled={locationLoading}
          />
        </View>

        {userLocation && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>Current Location</Text>
            <Text style={styles.address}>{userLocation.address}</Text>
          </View>
        )}

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
              {locationLoading ? (
                <ActivityIndicator size="large" color={Colors.light.primary} />
              ) : (
                <Text style={styles.mapPlaceholderText}>Loading map...</Text>
              )}
            </View>
          )}
        </View>

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
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
  },
  locationButton: {
    minWidth: 140,
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
