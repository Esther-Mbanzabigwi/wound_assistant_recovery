import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  isOpen: boolean;
  specialties: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function HospitalsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from a maps API
  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      distance: "0.8 km",
      rating: 4.5,
      phone: "+1-555-0123",
      isOpen: true,
      specialties: ["Emergency Care", "Wound Care", "Dermatology"],
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
    },
    {
      id: "2",
      name: "Community Medical Center",
      address: "456 Oak Avenue, Midtown",
      distance: "1.2 km",
      rating: 4.2,
      phone: "+1-555-0456",
      isOpen: true,
      specialties: ["Urgent Care", "Family Medicine", "Wound Treatment"],
      coordinates: { latitude: 37.7849, longitude: -122.4094 },
    },
    {
      id: "3",
      name: "University Medical Center",
      address: "789 University Blvd, Campus District",
      distance: "2.1 km",
      rating: 4.7,
      phone: "+1-555-0789",
      isOpen: true,
      specialties: ["Trauma Center", "Plastic Surgery", "Infectious Disease"],
      coordinates: { latitude: 37.7649, longitude: -122.4294 },
    },
    {
      id: "4",
      name: "Downtown Urgent Care",
      address: "321 Business District, Downtown",
      distance: "1.5 km",
      rating: 4.0,
      phone: "+1-555-0321",
      isOpen: false,
      specialties: ["Urgent Care", "Minor Procedures", "Wound Care"],
      coordinates: { latitude: 37.7749, longitude: -122.4094 },
    },
  ];

  useEffect(() => {
    // Simulate loading hospitals based on location
    setTimeout(() => {
      setNearbyHospitals(mockHospitals);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCallHospital = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Error", "Unable to make phone call");
    });
  };

  const handleGetDirections = (hospital: Hospital) => {
    const url = `https://maps.google.com/?q=${hospital.coordinates.latitude},${hospital.coordinates.longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open maps");
    });
  };

  const handleEmergencyCall = () => {
    Alert.alert("Emergency Services", "Call emergency services?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call 911",
        onPress: () => Linking.openURL("tel:911"),
        style: "destructive",
      },
    ]);
  };

  const renderHospitalCard = (hospital: Hospital) => (
    <View
      key={hospital.id}
      style={[styles.hospitalCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.hospitalHeader}>
        <View style={styles.hospitalInfo}>
          <Text style={[styles.hospitalName, { color: colors.text }]}>
            {hospital.name}
          </Text>
          <Text style={[styles.hospitalAddress, { color: colors.text }]}>
            {hospital.address}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: colors.text }]}>
              ⭐ {hospital.rating}/5
            </Text>
            <Text style={[styles.distanceText, { color: colors.tint }]}>
              📍 {hospital.distance}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: hospital.isOpen ? "#4CAF50" : "#F44336",
            },
          ]}
        >
          <Text style={styles.statusText}>
            {hospital.isOpen ? "OPEN" : "CLOSED"}
          </Text>
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        {hospital.specialties.map((specialty, index) => (
          <View
            key={index}
            style={[styles.specialtyBadge, { backgroundColor: colors.tint }]}
          >
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.tint }]}
          onPress={() => handleCallHospital(hospital.phone)}
        >
          <Text style={styles.actionButtonText}>📞 Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.card, borderColor: colors.tint },
          ]}
          onPress={() => handleGetDirections(hospital)}
        >
          <Text style={[styles.actionButtonText, { color: colors.tint }]}>
            🗺️ Directions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Nearby Hospitals
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Finding medical facilities near you...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Nearby Hospitals
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Medical facilities in your area
          </Text>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: "#F44336" }]}
          onPress={handleEmergencyCall}
        >
          <Text style={styles.emergencyButtonText}>
            🚨 EMERGENCY - Call 911
          </Text>
        </TouchableOpacity>

        {/* Hospitals List */}
        <View style={styles.hospitalsContainer}>
          {nearbyHospitals.map(renderHospitalCard)}
        </View>

        {/* Additional Resources */}
        <View style={[styles.resourcesCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.resourcesTitle, { color: colors.text }]}>
            Additional Resources
          </Text>

          <TouchableOpacity style={styles.resourceItem}>
            <Text style={[styles.resourceText, { color: colors.text }]}>
              📋 Find a Wound Care Specialist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Text style={[styles.resourceText, { color: colors.text }]}>
              💊 Local Pharmacies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Text style={[styles.resourceText, { color: colors.text }]}>
              📞 Telemedicine Services
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  emergencyButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  hospitalsContainer: {
    marginBottom: 30,
  },
  hospitalCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  hospitalInfo: {
    flex: 1,
    marginRight: 15,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hospitalAddress: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  distanceText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    gap: 8,
  },
  specialtyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  resourcesCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  resourceItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  resourceText: {
    fontSize: 16,
  },
});
