import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RecoveryData {
  totalPhotos: number;
  lastPhotoDate: string;
  recoveryProgress: number;
  daysSinceInjury: number;
  nextCheckup: string;
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { user, signOut } = useAuth();

  // Mock data - in real app, this would come from API/database
  const recoveryData: RecoveryData = {
    totalPhotos: 12,
    lastPhotoDate: "2024-01-15",
    recoveryProgress: 75,
    daysSinceInjury: 14,
    nextCheckup: "2024-01-20",
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Error", "Failed to sign out");
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#4CAF50";
    if (progress >= 60) return "#FF9800";
    return "#F44336";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Welcome back, {user?.name || "User"}!
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Track your wound recovery progress
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={[styles.signOutText, { color: colors.tint }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recovery Progress Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Recovery Progress
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${recoveryData.recoveryProgress}%`,
                    backgroundColor: getProgressColor(
                      recoveryData.recoveryProgress
                    ),
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>
              {recoveryData.recoveryProgress}% Complete
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statNumber, { color: colors.tint }]}>
              {recoveryData.totalPhotos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Photos Taken
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statNumber, { color: colors.tint }]}>
              {recoveryData.daysSinceInjury}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Days Since Injury
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Recent Activity
          </Text>
          <View style={styles.activityItem}>
            <Text style={[styles.activityIcon, { color: colors.tint }]}>
              📸
            </Text>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                Photo Captured
              </Text>
              <Text style={[styles.activityTime, { color: colors.text }]}>
                {recoveryData.lastPhotoDate}
              </Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Text style={[styles.activityIcon, { color: colors.tint }]}>
              ✅
            </Text>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                Analysis Complete
              </Text>
              <Text style={[styles.activityTime, { color: colors.text }]}>
                No infection detected
              </Text>
            </View>
          </View>
        </View>

        {/* Next Checkup */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Next Checkup
          </Text>
          <View style={styles.checkupContainer}>
            <Text style={[styles.checkupDate, { color: colors.tint }]}>
              {recoveryData.nextCheckup}
            </Text>
            <Text style={[styles.checkupText, { color: colors.text }]}>
              Remember to take a new photo for comparison
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
          >
            <Text style={styles.actionButtonText}>📸 Take New Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.card, borderColor: colors.tint },
            ]}
          >
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>
              📊 View History
            </Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
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
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    opacity: 0.7,
  },
  checkupContainer: {
    alignItems: "center",
  },
  checkupDate: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkupText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
  },
  quickActions: {
    gap: 15,
    marginBottom: 30,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
