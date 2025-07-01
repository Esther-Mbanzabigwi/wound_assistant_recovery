import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CaptureScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Capture</Text>
          </TouchableOpacity>
          <Link href="/history" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>History</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/hospitals" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Hospitals</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Capture Section */}
        <View style={styles.captureSection}>
          <Text style={styles.sectionTitle}>Wound Photo Capture</Text>
          <Text style={styles.sectionSubtitle}>
            Take or upload a photo of your C-section wound for  analysis
          </Text>

          <View style={styles.captureBox}>
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={32} color="#3B82F6" />
            </View>
            <Text style={styles.captureTitle}>Capture Wound Photo</Text>
            <Text style={styles.captureSubtitle}>
              Take a clear photo of your wound for analysis
            </Text>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Photo Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            <Text style={styles.tipText}>Ensure good lighting</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            <Text style={styles.tipText}>Keep the camera steady</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            <Text style={styles.tipText}>Center the wound in frame</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            <Text style={styles.tipText}>Maintain a consistent distance</Text>
          </View>
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
  captureSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 24,
  },
  captureBox: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  cameraIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  captureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  captureSubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    color: "#64748B",
    fontSize: 14,
    marginVertical: 16,
  },
  uploadButton: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "600",
  },
  tipsSection: {
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: "#1E293B",
    marginLeft: 12,
  },
});
