import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WoundPhoto {
  id: string;
  uri: string;
  date: string;
  analysis: string;
  severity: "low" | "medium" | "high";
}

export default function CaptureScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock recent photos - in real app, this would come from storage/API
  const recentPhotos: WoundPhoto[] = [
    {
      id: "1",
      uri: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Wound+Photo+1",
      date: "2024-01-15",
      analysis: "Healing well, no signs of infection",
      severity: "low",
    },
    {
      id: "2",
      uri: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Wound+Photo+2",
      date: "2024-01-12",
      analysis: "Minor inflammation detected",
      severity: "medium",
    },
  ];

  const handleTakePhoto = () => {
    // TODO: Implement camera functionality
    Alert.alert(
      "Camera",
      "Camera functionality will be implemented with expo-camera"
    );
  };

  const handleSelectFromGallery = () => {
    // TODO: Implement gallery picker
    Alert.alert(
      "Gallery",
      "Gallery picker will be implemented with expo-image-picker"
    );
  };

  const handleAnalyzePhoto = async () => {
    if (!selectedPhoto) {
      Alert.alert("Error", "Please select a photo first");
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      Alert.alert(
        "Analysis Complete",
        "No signs of infection detected. Continue monitoring.",
        [
          { text: "OK" },
          {
            text: "View Details",
            onPress: () => console.log("Navigate to analysis details"),
          },
        ]
      );
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "#4CAF50";
      case "medium":
        return "#FF9800";
      case "high":
        return "#F44336";
      default:
        return "#4CAF50";
    }
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
            Capture Wound Photo
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Take a photo or select from gallery for AI analysis
          </Text>
        </View>

        {/* Capture Options */}
        <View style={styles.captureSection}>
          <View style={styles.captureButtons}>
            <TouchableOpacity
              style={[styles.captureButton, { backgroundColor: colors.tint }]}
              onPress={handleTakePhoto}
            >
              <Text style={styles.captureButtonText}>📸 Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.captureButton,
                { backgroundColor: colors.card, borderColor: colors.tint },
              ]}
              onPress={handleSelectFromGallery}
            >
              <Text style={[styles.captureButtonText, { color: colors.tint }]}>
                🖼️ From Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Photo Preview */}
        {selectedPhoto && (
          <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.previewTitle, { color: colors.text }]}>
              Selected Photo
            </Text>
            <Image
              source={{ uri: selectedPhoto }}
              style={styles.previewImage}
            />
            <TouchableOpacity
              style={[styles.analyzeButton, { backgroundColor: colors.tint }]}
              onPress={handleAnalyzePhoto}
              disabled={isAnalyzing}
            >
              <Text style={styles.analyzeButtonText}>
                {isAnalyzing ? "Analyzing..." : "🔍 Analyze Photo"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Photos */}
        <View style={styles.recentSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Photos
          </Text>
          {recentPhotos.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              style={[styles.photoCard, { backgroundColor: colors.card }]}
              onPress={() => setSelectedPhoto(photo.uri)}
            >
              <Image
                source={{ uri: photo.uri }}
                style={styles.photoThumbnail}
              />
              <View style={styles.photoInfo}>
                <Text style={[styles.photoDate, { color: colors.text }]}>
                  {photo.date}
                </Text>
                <Text
                  style={[styles.photoAnalysis, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {photo.analysis}
                </Text>
                <View
                  style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(photo.severity) },
                  ]}
                >
                  <Text style={styles.severityText}>
                    {photo.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View style={[styles.tipsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>
            📋 Photo Tips
          </Text>
          <View style={styles.tipItem}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              • Ensure good lighting for clear photos
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              • Keep the camera steady and close to the wound
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              • Take photos from the same angle for consistency
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={[styles.tipText, { color: colors.text }]}>
              • Clean the area around the wound before taking photos
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
  captureSection: {
    marginBottom: 30,
  },
  captureButtons: {
    gap: 15,
  },
  captureButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  captureButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  previewCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 15,
  },
  analyzeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  analyzeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  recentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  photoCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  photoInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  photoDate: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  photoAnalysis: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  severityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
