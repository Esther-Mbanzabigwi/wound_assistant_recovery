import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="heart" size={32} color="#3B82F6" />
          <Text style={styles.logoText}>WoundTrack</Text>
        </View>
        <View style={styles.headerButtons}>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Your Recovery,{"\n"}
          <Text style={styles.titleHighlight}>Monitored</Text>
        </Text>

        <Text style={styles.description}>
          C-section wound monitoring for new mothers. Track your healing
          progress, get instant health insights, and find nearby medical care when
          you need it most.
        </Text>

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="camera" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.featureTitle}>Smart Monitoring</Text>
            <Text style={styles.featureDescription}>
              Capture wound photos with your phone camera and get instant
              Health assessments
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="shield-checkmark" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.featureTitle}>Early Detection</Text>
            <Text style={styles.featureDescription}>
              Get alerts for potential infections or complications before they
              become serious
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="medkit" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.featureTitle}>Medical Support</Text>
            <Text style={styles.featureDescription}>
              Find nearby healthcare facilities and get professional help when
              needed
            </Text>
          </View>
        </View>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.startTrackingButton}>
            <Text style={styles.startTrackingButtonText}>Start Tracking</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  loginButton: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
  },
  getStartedButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  getStartedButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
  },
  titleHighlight: {
    color: "#3B82F6",
  },
  description: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  features: {
    gap: 24,
    marginBottom: 48,
  },
  featureCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
  startTrackingButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startTrackingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
