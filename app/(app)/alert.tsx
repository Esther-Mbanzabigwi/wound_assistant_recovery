import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AlertData {
  severity: "low" | "medium" | "high";
  type: "infection" | "inflammation" | "healing_issue";
  description: string;
  recommendations: string[];
  urgentActions: string[];
  photoUri: string;
  timestamp: string;
}

export default function AlertScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);

  // Mock alert data - in real app, this would come from AI analysis
  const mockAlert: AlertData = {
    severity: "medium",
    type: "infection",
    description:
      "Signs of potential infection detected. Redness and swelling around the wound area suggest bacterial activity.",
    recommendations: [
      "Clean the wound thoroughly with antiseptic solution",
      "Apply prescribed antibiotic ointment",
      "Keep the wound covered with sterile dressing",
      "Monitor for increased redness, swelling, or pain",
      "Take photos daily to track changes",
    ],
    urgentActions: [
      "Contact your healthcare provider within 24 hours",
      "If symptoms worsen, seek immediate medical attention",
      "Do not apply any home remedies without medical advice",
    ],
    photoUri:
      "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Infected+Wound",
    timestamp: "2024-01-15 14:30",
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "#FF9800";
      case "medium":
        return "#F44336";
      case "high":
        return "#D32F2F";
      default:
        return "#FF9800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return "⚠️";
      case "medium":
        return "🚨";
      case "high":
        return "🚨";
      default:
        return "⚠️";
    }
  };

  const handleContactProvider = () => {
    Alert.alert(
      "Contact Healthcare Provider",
      "Choose how to contact your provider:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call Provider",
          onPress: () => Linking.openURL("tel:+1-555-0123"),
        },
        {
          text: "Send Message",
          onPress: () => console.log("Open messaging app"),
        },
      ]
    );
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

  const handleFindHospital = () => {
    // Navigate to hospitals screen
    console.log("Navigate to hospitals screen");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            ⚠️ Alert Detected
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            AI analysis has identified potential issues with your wound
          </Text>
        </View>

        {/* Alert Card */}
        <View style={[styles.alertCard, { backgroundColor: colors.card }]}>
          <View style={styles.alertHeader}>
            <View
              style={[
                styles.severityBadge,
                { backgroundColor: getSeverityColor(mockAlert.severity) },
              ]}
            >
              <Text style={styles.severityText}>
                {getSeverityIcon(mockAlert.severity)}{" "}
                {mockAlert.severity.toUpperCase()} ALERT
              </Text>
            </View>
            <Text style={[styles.timestamp, { color: colors.text }]}>
              {mockAlert.timestamp}
            </Text>
          </View>

          <Text style={[styles.alertDescription, { color: colors.text }]}>
            {mockAlert.description}
          </Text>
        </View>

        {/* Photo Analysis */}
        <View style={[styles.photoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Analysis Photo
          </Text>
          <View style={styles.photoContainer}>
            <View
              style={[
                styles.photoFrame,
                { borderColor: getSeverityColor(mockAlert.severity) },
              ]}
            >
              <Text style={[styles.photoPlaceholder, { color: colors.text }]}>
                📸 Wound Photo
              </Text>
            </View>
          </View>
        </View>

        {/* Immediate Actions */}
        <View style={[styles.actionsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🚨 Immediate Actions
          </Text>
          {mockAlert.urgentActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text
                style={[
                  styles.bulletPoint,
                  { color: getSeverityColor(mockAlert.severity) },
                ]}
              >
                •
              </Text>
              <Text style={[styles.actionText, { color: colors.text }]}>
                {action}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: getSeverityColor(mockAlert.severity) },
            ]}
            onPress={handleContactProvider}
          >
            <Text style={styles.primaryButtonText}>📞 Contact Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              { backgroundColor: colors.card, borderColor: colors.tint },
            ]}
            onPress={handleFindHospital}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.tint }]}>
              🏥 Find Hospital
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.emergencyButton, { backgroundColor: "#D32F2F" }]}
            onPress={handleEmergencyCall}
          >
            <Text style={styles.emergencyButtonText}>
              🚨 EMERGENCY - Call 911
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <View
          style={[styles.recommendationsCard, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📋 Care Recommendations
          </Text>
          {mockAlert.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Text style={[styles.bulletPoint, { color: colors.tint }]}>
                •
              </Text>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                {recommendation}
              </Text>
            </View>
          ))}
        </View>

        {/* Additional Information */}
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ℹ️ Important Information
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            This alert is based on AI analysis of your wound photo. While our
            system is designed to detect potential issues, it should not replace
            professional medical advice. Always consult with a healthcare
            provider for proper diagnosis and treatment.
          </Text>
        </View>

        {/* Next Steps */}
        <View style={[styles.nextStepsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📅 Next Steps
          </Text>
          <View style={styles.nextStepItem}>
            <Text style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
              1
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Contact your healthcare provider within 24 hours
            </Text>
          </View>
          <View style={styles.nextStepItem}>
            <Text style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
              2
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Take another photo in 12 hours to track changes
            </Text>
          </View>
          <View style={styles.nextStepItem}>
            <Text style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
              3
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Follow the care recommendations provided
            </Text>
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
    lineHeight: 24,
  },
  alertCard: {
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
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 14,
    opacity: 0.7,
  },
  alertDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  photoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  photoContainer: {
    alignItems: "center",
  },
  photoFrame: {
    width: 200,
    height: 150,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    fontSize: 16,
    opacity: 0.7,
  },
  actionsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  actionText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  actionButtons: {
    gap: 15,
    marginBottom: 20,
  },
  primaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
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
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emergencyButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendationsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  recommendationItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
  nextStepsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  nextStepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
});
