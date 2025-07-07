import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import Button from "../../components/ui/Button";
import { useAuthContext } from "../../context/authcontext";

export default function OverviewScreen() {
  const { user, logout } = useAuthContext();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome back, {user?.username || "User"}!
        </Text>
        <Text style={styles.subtitle}>
          Track your recovery progress and stay healthy
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Recovery Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Healthy</Text>
            </View>
          </View>
          <Text style={styles.lastChecked}>Last checked 2 hours ago</Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Text>🗓️</Text>
            </View>
            <Text style={styles.metricValue}>12</Text>
            <Text style={styles.metricLabel}>Days Since Surgery</Text>
            <Text style={styles.metricStatus}>Recovery on track</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Text>📸</Text>
            </View>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricLabel}>Photos Taken</Text>
            <Text style={styles.metricStatus}>Last photo today</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionSubtitle}>
            Common tasks for your recovery tracking
          </Text>

          <View style={styles.actionGrid}>
            <Link href="/capture" asChild>
              <Button
                title="Take New Photo"
                variant="primary"
                style={styles.actionButton}
                onPress={() => {}}
              />
            </Link>

            <Link href="/history" asChild>
              <Button
                title="View History"
                variant="secondary"
                style={styles.actionButton}
                onPress={() => {}}
              />
            </Link>

            <Link href="/hospitals" asChild>
              <Button
                title="Find Hospitals"
                variant="secondary"
                style={styles.actionButton}
                onPress={() => {}}
              />
            </Link>

            <Button
              title="Logout"
              variant="outline"
              style={styles.actionButton}
              onPress={logout}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>✅</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Wound assessment - Healthy
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>📸</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Photo captured</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>✅</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Wound assessment - Healthy
                </Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1849D7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#22C55E",
    fontWeight: "600",
  },
  lastChecked: {
    fontSize: 14,
    color: "#666",
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1849D7",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  metricStatus: {
    fontSize: 12,
    color: "#22C55E",
    fontWeight: "500",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  actionGrid: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: "#666",
  },
});
