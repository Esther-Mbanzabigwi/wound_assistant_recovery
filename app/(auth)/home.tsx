import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const LOGO = require("@/assets/images/icon.png"); // Use your logo or a placeholder

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const features = [
    {
      icon: "📸",
      title: "Smart Monitoring",
      description:
        "Capture wound photos with your phone camera and get instant AI-powered health assessments",
    },
    {
      icon: "🛡️",
      title: "Early Detection",
      description:
        "Get alerts for potential infections or complications before they become serious",
    },
  ];

  return (
    <View style={styles.bg}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.brand}>WoundTrack</Text>
        </View>
        <View style={styles.headerNav}>
          <Link href="/(auth)/login" asChild>
            <Text style={styles.headerLink}>Login</Text>
          </Link>
          <Link href="/(auth)/register" asChild>
            <Text style={styles.headerButton}>Get Started</Text>
          </Link>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Your Recovery, Monitored</Text>
          <Text style={styles.heroSubtitle}>
            AI-powered C-section wound monitoring for new mothers. Track your
            healing progress, get instant health insights, and find nearby
            medical care when you need it most.
          </Text>
          <View style={styles.heroActions}>
            <Link href="/(auth)/register" asChild>
              <Button
                title="Start Tracking"
                variant="primary"
                onPress={() => {}}
                style={styles.heroButton}
              />
            </Link>
            <Link href="/(auth)/login" asChild>
              <Button
                title="Login"
                variant="secondary"
                onPress={() => {}}
                style={styles.heroButton}
              />
            </Link>
          </View>
        </View>
        {/* Features Section */}
        <Text style={styles.sectionTitle}>
          Everything You Need for Safe Recovery
        </Text>
        <View style={styles.featuresList}>
          {features.map((feature, idx) => (
            <Card key={idx} style={styles.featureCard}>
              <View style={styles.featureIconWrap}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.description}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#f6faff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 6,
  },
  brand: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 0.5,
  },
  headerNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLink: {
    fontSize: 15,
    color: "#334155",
    marginRight: 8,
    fontWeight: "500",
  },
  headerButton: {
    backgroundColor: "#111827",
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  heroSection: {
    marginTop: 32,
    marginBottom: 32,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  heroActions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  heroButton: {
    minWidth: 130,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 18,
    textAlign: "center",
  },
  featuresList: {
    width: "90%",
    alignSelf: "center",
    marginTop: 0,
  },
  featureCard: {
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
  },
  featureIconWrap: {
    backgroundColor: "#e0e7ff",
    borderRadius: 32,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 15,
    color: "#334155",
    textAlign: "center",
    lineHeight: 22,
  },
});
