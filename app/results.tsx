import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import Button from '../components/ui/Button';
import { WoundPrediction } from '../api';

export default function ResultsScreen() {
  const router = useRouter();
  const { prediction, imageUri } = useLocalSearchParams<{
    prediction: string;
    imageUri: string;
  }>();

  const predictionData: WoundPrediction = JSON.parse(prediction);

  const getUrgencyColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'HIGH':
        return '#FF4444';
      case 'MEDIUM':
        return '#FFA500';
      case 'LOW':
        return '#44BB44';
      default:
        return '#666666';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Analysis Results</Text>
          <Text style={styles.subtitle}>
            Here's what we found from analyzing your wound
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Classification</Text>
            <Text style={styles.confidence}>
              {(predictionData.confidence * 100).toFixed(1)}% confidence
            </Text>
          </View>
          <Text style={styles.classification}>
            {predictionData.predicted_class}
          </Text>

          <View style={styles.urgencyContainer}>
            <Text style={styles.urgencyLabel}>Urgency Level:</Text>
            <View
              style={[
                styles.urgencyBadge,
                { backgroundColor: getUrgencyColor(predictionData.urgency_level) },
              ]}
            >
              <Text style={styles.urgencyText}>
                {predictionData.urgency_level}
              </Text>
            </View>
          </View>

          <View style={styles.hospitalContainer}>
            <Text style={styles.hospitalText}>
              {predictionData.requires_hospital
                ? '⚠️ Hospital visit recommended'
                : '✓ No immediate hospital visit needed'}
            </Text>
          </View>

          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Recommendations:</Text>
            {predictionData.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={styles.recommendationBullet}>•</Text>
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Take Another Photo"
            variant="secondary"
            onPress={() => router.back()}
            style={styles.button}
          />
          <Button
            title="View History"
            variant="primary"
            onPress={() => router.push('/history')}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </ThemedView>
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
  imageContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    aspectRatio: 4/3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  confidence: {
    fontSize: 14,
    color: '#666',
  },
  classification: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1849D7',
    marginBottom: 16,
  },
  urgencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  urgencyLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  urgencyText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  hospitalContainer: {
    marginBottom: 16,
  },
  hospitalText: {
    fontSize: 16,
    color: '#333',
  },
  recommendationsContainer: {
    gap: 8,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    gap: 8,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#1849D7',
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  button: {
    width: '100%',
  },
}); 