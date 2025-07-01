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

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const historyData = [
    {
      date: "2024-06-29",
      time: "14:30",
      status: "Healthy",
      confidence: "95%",
      details: "Wound healing progressing well",
    },
    {
      date: "2024-06-28",
      time: "09:15",
      status: "Healthy",
      confidence: "89%",
      details: "Good recovery progress",
    },
    {
      date: "2024-06-27",
      time: "16:45",
      status: "Monitor",
      confidence: "75%",
      details: "Minor inflammation detected",
    },
    {
      date: "2024-06-26",
      time: "11:30",
      status: "Healthy",
      confidence: "92%",
      details: "Healing on track",
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
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>History</Text>
          </TouchableOpacity>
          <Link href="/hospitals" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Hospitals</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Recovery Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>Recovery Timeline</Text>
          <Text style={styles.timelineSubtitle}>
            Track your wound healing progress over time
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Days Since Surgery</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Photos Analyzed</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>87%</Text>
              <Text style={styles.statLabel}>Avg. Health Score</Text>
            </View>
          </View>
        </View>

        {/* Photo History */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Photo History</Text>
            <TouchableOpacity>
              <Text style={styles.viewTrendText}>View Trends</Text>
            </TouchableOpacity>
          </View>

          {historyData.map((entry, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={styles.historyCardHeader}>
                <View>
                  <Text style={styles.dateText}>{entry.date}</Text>
                  <Text style={styles.timeText}>{entry.time}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          entry.status === "Healthy" ? "#059669" : "#EAB308",
                      },
                    ]}
                  >
                    {entry.status}
                  </Text>
                  <Text style={styles.confidenceText}>
                    Confidence: {entry.confidence}
                  </Text>
                </View>
              </View>
              <Text style={styles.detailsText}>{entry.details}</Text>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
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
  timelineSection: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  historySection: {
    padding: 20,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  viewTrendText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
  timeText: {
    fontSize: 14,
    color: "#64748B",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  confidenceText: {
    fontSize: 12,
    color: "#64748B",
  },
  detailsText: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 12,
  },
  viewDetailsButton: {
    alignSelf: "flex-start",
  },
  viewDetailsText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
});
