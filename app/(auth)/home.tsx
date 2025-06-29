import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const features = [
    {
      icon: "📸",
      title: "AI-Powered Analysis",
      description:
        "Advanced computer vision to detect infections and track healing progress",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Monitor your recovery with detailed timelines and visual comparisons",
    },
    {
      icon: "⚠️",
      title: "Early Warning System",
      description:
        "Get alerts for potential complications before they become serious",
    },
    {
      icon: "🏥",
      title: "Medical Resources",
      description:
        "Find nearby hospitals and connect with healthcare providers",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "This app helped me track my surgical wound recovery. The AI analysis caught early signs of infection that I missed.",
      rating: 5,
    },
    {
      name: "John D.",
      text: "As a diabetic, wound care is crucial. This app gives me peace of mind and helps me stay on top of my health.",
      rating: 5,
    },
    {
      name: "Maria L.",
      text: "The progress tracking feature is amazing. I can see my wound healing over time with clear visual evidence.",
      rating: 4,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Wound Assistant
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.text }]}>
            AI-powered wound monitoring and recovery tracking for better health
            outcomes
          </Text>
          <View style={styles.heroButtons}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: colors.tint }]}
              >
                <Text
                  style={[styles.secondaryButtonText, { color: colors.tint }]}
                >
                  Learn More
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Why Choose Wound Assistant?
          </Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[styles.featureCard, { backgroundColor: colors.card }]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text
                  style={[styles.featureDescription, { color: colors.text }]}
                >
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How It Works
          </Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View
                style={[styles.stepNumber, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  Take a Photo
                </Text>
                <Text style={[styles.stepDescription, { color: colors.text }]}>
                  Capture a clear photo of your wound using your phone's camera
                </Text>
              </View>
            </View>
            <View style={styles.step}>
              <View
                style={[styles.stepNumber, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  AI Analysis
                </Text>
                <Text style={[styles.stepDescription, { color: colors.text }]}>
                  Our advanced AI analyzes the image for signs of infection or
                  healing issues
                </Text>
              </View>
            </View>
            <View style={styles.step}>
              <View
                style={[styles.stepNumber, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  Get Insights
                </Text>
                <Text style={[styles.stepDescription, { color: colors.text }]}>
                  Receive detailed analysis, recommendations, and progress
                  tracking
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What Our Users Say
          </Text>
          <View style={styles.testimonialsContainer}>
            {testimonials.map((testimonial, index) => (
              <View
                key={index}
                style={[
                  styles.testimonialCard,
                  { backgroundColor: colors.card },
                ]}
              >
                <View style={styles.ratingContainer}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Text key={i} style={styles.star}>
                      ⭐
                    </Text>
                  ))}
                </View>
                <Text style={[styles.testimonialText, { color: colors.text }]}>
                  "{testimonial.text}"
                </Text>
                <Text
                  style={[styles.testimonialAuthor, { color: colors.text }]}
                >
                  - {testimonial.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={[styles.ctaSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.ctaTitle, { color: colors.text }]}>
            Ready to Start Your Recovery Journey?
          </Text>
          <Text style={[styles.ctaDescription, { color: colors.text }]}>
            Join thousands of users who trust Wound Assistant for their wound
            care monitoring
          </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity
              style={[styles.ctaButton, { backgroundColor: colors.tint }]}
            >
              <Text style={styles.ctaButtonText}>Create Free Account</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            © 2024 Wound Assistant. All rights reserved.
          </Text>
          <Text style={[styles.footerText, { color: colors.text }]}>
            This app is not a substitute for professional medical advice.
          </Text>
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
  heroSection: {
    padding: 20,
    paddingTop: 80,
    alignItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 30,
    opacity: 0.8,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 15,
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
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
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  featuresGrid: {
    gap: 20,
  },
  featureCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.8,
  },
  stepsContainer: {
    gap: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  testimonialsContainer: {
    gap: 15,
  },
  testimonialCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    fontSize: 16,
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  ctaSection: {
    margin: 20,
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.8,
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.6,
    marginBottom: 5,
  },
});
