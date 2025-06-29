import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WoundEntry {
  id: string;
  date: string;
  time: string;
  photoUri: string;
  analysis: string;
  severity: "low" | "medium" | "high";
  notes?: string;
  recommendations: string[];
}

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedEntry, setSelectedEntry] = useState<WoundEntry | null>(null);

  // Mock data - in real app, this would come from API/database
  const woundHistory: WoundEntry[] = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      photoUri:
        "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Wound+1",
      analysis:
        "Healing well, no signs of infection. Wound edges are clean and granulation tissue is healthy.",
      severity: "low",
      notes: "Applied new dressing, wound appears to be healing nicely.",
      recommendations: [
        "Continue current treatment plan",
        "Keep wound clean and dry",
        "Monitor for any changes in color or odor",
      ],
    },
    {
      id: "2",
      date: "2024-01-12",
      time: "09:15",
      photoUri:
        "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Wound+2",
      analysis:
        "Minor inflammation detected around wound edges. Slight redness present.",
      severity: "medium",
      recommendations: [
        "Apply prescribed antibiotic ointment",
        "Monitor for increased redness or swelling",
        "Contact healthcare provider if symptoms worsen",
      ],
    },
    {
      id: "3",
      date: "2024-01-09",
      time: "16:45",
      photoUri:
        "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Wound+3",
      analysis: "Wound healing progressing normally. Scab formation observed.",
      severity: "low",
      recommendations: [
        "Do not pick at scab",
        "Keep area clean",
        "Continue with current care routine",
      ],
    },
    {
      id: "4",
      date: "2024-01-06",
      time: "11:20",
      photoUri:
        "https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Wound+4",
      analysis: "Initial wound assessment. Clean wound with good blood supply.",
      severity: "low",
      recommendations: [
        "Follow initial treatment plan",
        "Take photos daily for first week",
        "Report any unusual symptoms",
      ],
    },
  ];

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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return "✅";
      case "medium":
        return "⚠️";
      case "high":
        return "🚨";
      default:
        return "✅";
    }
  };

  const renderHistoryItem = ({ item }: { item: WoundEntry }) => (
    <TouchableOpacity
      style={[styles.historyCard, { backgroundColor: colors.card }]}
      onPress={() => setSelectedEntry(item)}
    >
      <View style={styles.historyHeader}>
        <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {item.date}
          </Text>
          <Text style={[styles.timeText, { color: colors.text }]}>
            {item.time}
          </Text>
        </View>
        <View
          style={[
            styles.severityBadge,
            { backgroundColor: getSeverityColor(item.severity) },
          ]}
        >
          <Text style={styles.severityText}>
            {getSeverityIcon(item.severity)} {item.severity.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.photoContainer}>
        <Image source={{ uri: item.photoUri }} style={styles.historyPhoto} />
        <View style={styles.analysisContainer}>
          <Text
            style={[styles.analysisText, { color: colors.text }]}
            numberOfLines={3}
          >
            {item.analysis}
          </Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={[styles.notesLabel, { color: colors.text }]}>
            Notes:
          </Text>
          <Text style={[styles.notesText, { color: colors.text }]}>
            {item.notes}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Wound History
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Track your recovery progress over time
        </Text>
      </View>

      <FlatList
        data={woundHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Selected Entry Modal */}
      {selectedEntry && (
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {selectedEntry.date} at {selectedEntry.time}
              </Text>
              <TouchableOpacity onPress={() => setSelectedEntry(null)}>
                <Text style={[styles.closeButton, { color: colors.tint }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: selectedEntry.photoUri }}
              style={styles.modalPhoto}
            />

            <View
              style={[
                styles.severityContainer,
                { backgroundColor: getSeverityColor(selectedEntry.severity) },
              ]}
            >
              <Text style={styles.severityText}>
                {getSeverityIcon(selectedEntry.severity)}{" "}
                {selectedEntry.severity.toUpperCase()} SEVERITY
              </Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Analysis
              </Text>
              <Text style={[styles.sectionText, { color: colors.text }]}>
                {selectedEntry.analysis}
              </Text>
            </View>

            {selectedEntry.notes && (
              <View style={styles.modalSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Notes
                </Text>
                <Text style={[styles.sectionText, { color: colors.text }]}>
                  {selectedEntry.notes}
                </Text>
              </View>
            )}

            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recommendations
              </Text>
              {selectedEntry.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={[styles.bulletPoint, { color: colors.tint }]}>
                    •
                  </Text>
                  <Text
                    style={[styles.recommendationText, { color: colors.text }]}
                  >
                    {rec}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
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
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  historyCard: {
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
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
    opacity: 0.7,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  photoContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  historyPhoto: {
    width: 100,
    height: 75,
    borderRadius: 8,
    marginRight: 15,
  },
  analysisContainer: {
    flex: 1,
    justifyContent: "center",
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 20,
  },
  notesContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  notesText: {
    fontSize: 14,
    opacity: 0.8,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  severityContainer: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  recommendationItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
});
