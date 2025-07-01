import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HospitalsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const hospitals = [
    {
      name: "City General Hospital",
      distance: "0.8",
      rating: 4.5,
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      hours: "24/7",
      waitTime: "~15 mins",
      specialties: ["Emergency Care", "Maternity", "Surgery"],
    },
    {
      name: "Women's Health Center",
      distance: "1.2",
      rating: 4.8,
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 987-6543",
      hours: "6 AM - 10 PM",
      waitTime: "~30 mins",
      specialties: ["Women's Health", "Postpartum Care", "OB/GYN"],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Welcome back, Sarah!
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Track your recovery progress and stay healthy
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabs}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Overview</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/capture" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Capture</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/history" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>History</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Hospitals</Text>
          </TouchableOpacity>
        </View>

        {/* Find Nearby Hospitals Section */}
        <View style={styles.findSection}>
          <Text style={styles.findTitle}>Find Nearby Hospitals</Text>
          <Text style={styles.findSubtitle}>
            Locate medical facilities near you for immediate care
          </Text>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#64748B" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search hospitals..."
                placeholderTextColor="#64748B"
              />
            </View>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationButtonText}>Use My Location</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.currentLocation}>
            <Ionicons name="location" size={16} color="#3B82F6" />
            <Text style={styles.locationText}>Downtown Area, Main Street</Text>
          </View>
        </View>

        {/* Hospital List */}
        <View style={styles.hospitalList}>
          {hospitals.map((hospital, index) => (
            <View key={index} style={styles.hospitalCard}>
              <View style={styles.hospitalHeader}>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < Math.floor(hospital.rating) ? "star" : "star-outline"}
                          size={16}
                          color="#F59E0B"
                        />
                      ))}
                    </View>
                    <Text style={styles.rating}>({hospital.rating})</Text>
                  </View>
                </View>
                <Text style={styles.distance}>{hospital.distance} miles away</Text>
              </View>

              <View style={styles.contactInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="location" size={16} color="#64748B" />
                  <Text style={styles.infoText}>{hospital.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={16} color="#64748B" />
                  <Text style={styles.infoText}>{hospital.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="time" size={16} color="#64748B" />
                  <Text style={styles.infoText}>{hospital.hours}</Text>
                </View>
              </View>

              <Text style={styles.waitTime}>Wait Time: {hospital.waitTime}</Text>

              <View style={styles.specialties}>
                <Text style={styles.specialtiesTitle}>Specialties:</Text>
                <View style={styles.specialtiesTags}>
                  {hospital.specialties.map((specialty, i) => (
                    <View key={i} style={styles.specialtyTag}>
                      <Text style={styles.specialtyText}>{specialty}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="navigate" size={20} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Get Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="call" size={20} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
  },
  tabText: {
    color: "#64748B",
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "500",
  },
  findSection: {
    padding: 20,
  },
  findTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  findSubtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1E293B",
  },
  locationButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  locationButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  currentLocation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1E293B",
  },
  hospitalList: {
    padding: 20,
  },
  hospitalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    color: "#64748B",
  },
  distance: {
    fontSize: 14,
    color: "#64748B",
  },
  contactInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1E293B",
  },
  waitTime: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 12,
  },
  specialties: {
    marginBottom: 16,
  },
  specialtiesTitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  specialtiesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  specialtyText: {
    fontSize: 14,
    color: "#1E293B",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
});
