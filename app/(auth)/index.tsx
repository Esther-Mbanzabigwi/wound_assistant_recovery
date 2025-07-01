import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Wound Assistant</Text>
        <Text style={styles.subtitle}>C-Section Recovery Monitoring</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Monitor Your Recovery</Text>
          <Text style={styles.heroDescription}>
            Track your C-section wound healing progress with AI-powered analysis
            and get early infection alerts.
          </Text>
        </View>
      </View>

      <View style={styles.features}>
        <Card style={styles.featureCard}>
          <Text style={styles.featureTitle}>📸 Photo Analysis</Text>
          <Text style={styles.featureText}>
            Capture wound photos and get instant AI analysis for infection
            detection.
          </Text>
        </Card>

        <Card style={styles.featureCard}>
          <Text style={styles.featureTitle}>📊 Progress Tracking</Text>
          <Text style={styles.featureText}>
            Monitor your healing progress with detailed charts and metrics.
          </Text>
        </Card>

        <Card style={styles.featureCard}>
          <Text style={styles.featureTitle}>🏥 Hospital Finder</Text>
          <Text style={styles.featureText}>
            Find nearby hospitals and healthcare facilities when you need them.
          </Text>
        </Card>

        <Card style={styles.featureCard}>
          <Text style={styles.featureTitle}>🚨 Early Alerts</Text>
          <Text style={styles.featureText}>
            Get notified about potential infections and complications early.
          </Text>
        </Card>
      </View>

      <View style={styles.actions}>
        <Link href="/(auth)/login" asChild>
          <Button title="Sign In" variant="primary" />
        </Link>

        <Link href="/(auth)/register" asChild>
          <Button title="Create Account" variant="outline" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.gray[600],
    textAlign: "center",
  },
  hero: {
    backgroundColor: Colors.light.blue[50],
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.light.blue[200],
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  heroDescription: {
    fontSize: 16,
    color: Colors.light.gray[700],
    textAlign: "center",
    lineHeight: 24,
  },
  features: {
    marginBottom: 32,
  },
  featureCard: {
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.gray[600],
    lineHeight: 20,
  },
  actions: {
    gap: 12,
  },
});
