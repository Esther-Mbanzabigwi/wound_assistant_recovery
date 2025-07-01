import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/ui/Button';

export default function HistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recovery Timeline</Text>
        <Text style={styles.subtitle}>Track your wound healing progress over time</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Days Since Surgery</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Photos Analyzed</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>87%</Text>
          <Text style={styles.statLabel}>Avg. Health Score</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Photo History</Text>
          <Button
            title="View Trends"
            variant="secondary"
            onPress={() => {}}
            style={styles.viewButton}
          />
        </View>

        <ScrollView style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.timelinePhoto}>
              <Text style={styles.photoPlaceholder}>📸</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>2024-06-29 14:30</Text>
              <Text style={styles.timelineStatus}>Healthy</Text>
              <Text style={styles.timelineConfidence}>Confidence: 95%</Text>
              <Text style={styles.timelineNote}>Wound healing progressing well</Text>
              <Button
                title="View Details"
                variant="secondary"
                onPress={() => {}}
                style={styles.detailsButton}
              />
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelinePhoto}>
              <Text style={styles.photoPlaceholder}>📸</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>2024-06-28 09:15</Text>
              <Text style={styles.timelineStatus}>Healthy</Text>
              <Text style={styles.timelineConfidence}>Confidence: 89%</Text>
              <Text style={styles.timelineNote}>Good recovery progress</Text>
              <Button
                title="View Details"
                variant="secondary"
                onPress={() => {}}
                style={styles.detailsButton}
              />
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelinePhoto}>
              <Text style={styles.photoPlaceholder}>📸</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>2024-06-27 16:45</Text>
              <Text style={[styles.timelineStatus, styles.warningStatus]}>Monitor</Text>
              <Text style={styles.timelineConfidence}>Confidence: 78%</Text>
              <Text style={styles.timelineNote}>Minor inflammation detected</Text>
              <Button
                title="View Details"
                variant="secondary"
                onPress={() => {}}
                style={styles.detailsButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1849D7',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1849D7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  viewButton: {
    minWidth: 100,
  },
  timeline: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelinePhoto: {
    width: 60,
    height: 60,
    backgroundColor: '#F5F7FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  photoPlaceholder: {
    fontSize: 24,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timelineStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    marginBottom: 4,
  },
  warningStatus: {
    color: '#F59E0B',
  },
  timelineConfidence: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timelineNote: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  detailsButton: {
    alignSelf: 'flex-start',
  },
}); 