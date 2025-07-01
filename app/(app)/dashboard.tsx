import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
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

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Welcome back, {user?.name || "Sarah"}!
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Track your recovery progress and stay healthy
          </Text>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Overview</Text>
          </TouchableOpacity>
          <Link href="/capture" asChild>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Capture</Text>
            </TouchableOpacity>
          </Link>
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

        {/* Recovery Status */}
        <View style={[styles.card, styles.statusCard]}>
          <View style={styles.statusHeader}>
            <Text style={styles.cardTitle}>Recovery Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Healthy</Text>
            </View>
          </View>
          <Text style={styles.lastChecked}>Last checked 2 hours ago</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.card, styles.statCard]}>
            <Text style={styles.statTitle}>Days Since Surgery</Text>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSubtext}>Recovery on track</Text>
          </View>
          <View style={[styles.card, styles.statCard]}>
            <Text style={styles.statTitle}>Photos Taken</Text>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statSubtext}>Last photo today</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionSubtitle}>Common tasks for your recovery tracking</Text>
          
          <Link href="/capture" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Take New Photo</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/history" asChild>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonTextSecondary}>View History</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/hospitals" asChild>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonTextSecondary}>Find Hospitals</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionSubtitle}>Your latest wound assessments</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wound assessment - Healthy</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Photo captured</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Wound assessment - Healthy</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
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
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statusCard: {
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "500",
  },
  lastChecked: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 14,
    color: "#64748B",
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtonSecondary: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonTextSecondary: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "500",
  },
  recentActivity: {
    padding: 20,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    color: "#64748B",
  },
});
