import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: colors.text }]}>🩹</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Wound Assistant
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            AI-powered wound monitoring and recovery tracking
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: colors.tint }]}>📸</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Capture wound photos with AI analysis
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: colors.tint }]}>📊</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Track recovery progress over time
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: colors.tint }]}>⚠️</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Get alerts for potential infections
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: colors.tint }]}>🏥</Text>
            <Text style={[styles.featureText, { color: colors.text }]}>
              Find nearby medical facilities
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.tint }]}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.tint }]}
            >
              <Text
                style={[styles.secondaryButtonText, { color: colors.tint }]}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 24,
  },
  features: {
    marginBottom: 60,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
