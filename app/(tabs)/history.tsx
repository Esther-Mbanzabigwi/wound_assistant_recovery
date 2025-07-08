import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import api from '../../api';

interface PredictionHistory {
  id: number;
  attributes: {
    imageUrl: string;
    classification: string;
    confidence: number;
    urgencyLevel: string;
    requiresHospital: boolean;
    recommendations: string[];
    timestamp: string;
  };
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<PredictionHistory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const loadHistory = async () => {
    try {
      const response = await api.predictions.getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: PredictionHistory }) => (
    <TouchableOpacity
      style={styles.historyCard}
      onPress={() => {
        router.push({
          pathname: '/results',
          params: {
            prediction: JSON.stringify({
              predicted_class: item.attributes.classification,
              confidence: item.attributes.confidence,
              urgency_level: item.attributes.urgencyLevel,
              requires_hospital: item.attributes.requiresHospital,
              recommendations: item.attributes.recommendations,
            }),
            imageUri: item.attributes.imageUrl,
          },
        });
      }}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: item.attributes.imageUrl }}
          style={styles.thumbnail}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.classification}>
            {item.attributes.classification}
          </Text>
          <Text style={styles.timestamp}>
            {formatDate(item.attributes.timestamp)}
          </Text>
          <View style={styles.urgencyContainer}>
            <View
              style={[
                styles.urgencyBadge,
                {
                  backgroundColor: getUrgencyColor(item.attributes.urgencyLevel),
                },
              ]}
            >
              <Text style={styles.urgencyText}>
                {item.attributes.urgencyLevel}
              </Text>
            </View>
            {item.attributes.requiresHospital && (
              <Text style={styles.hospitalIndicator}>⚠️ Hospital Visit</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analysis History</Text>
        <Text style={styles.subtitle}>
          Review your past wound analyses and track healing progress
        </Text>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No wound analyses yet. Take a photo to get started!
            </Text>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  list: {
    padding: 20,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  classification: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1849D7',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  urgencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  hospitalIndicator: {
    fontSize: 12,
    color: '#FF4444',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 