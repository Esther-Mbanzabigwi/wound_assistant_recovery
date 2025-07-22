import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import PredictionHandler from '@/api/prediction';
import { useAuthContext } from '@/context/authcontext';
import AppLayout from '@/components/AppLayout';
import { Colors } from '@/constants/Colors';
import { SharedStyles } from '@/constants/SharedStyles';
import { IPrediction } from '@/types/prediction';

export default function HistoryScreen() {
  const [history, setHistory] = useState<IPrediction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const router = useRouter();
  const { user } = useAuthContext();

  const loadHistory = async () => {
    try {
      setLoading(true);
      setDebugInfo('🔄 Loading predictions from database...');
      
      // Always try to fetch all predictions first
      const allPredictions = await PredictionHandler.getAllPredictions();
      console.log('Fetched all predictions:', allPredictions);
      
      if (allPredictions && allPredictions.length > 0) {
        setHistory(allPredictions);
        setDebugInfo(`✅ Successfully loaded ${allPredictions.length} predictions`);
      } else {
        setDebugInfo('📭 No predictions found in database. Create some test data first!');
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      setDebugInfo(`❌ Error loading predictions: ${error.message}`);
      
      // Try direct fetch as fallback
      try {
        setDebugInfo('🔄 Trying direct API fetch...');
        const response = await fetch('https://wound-assitant-backend.onrender.com/api/predictions?populate=*');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setHistory(data.data);
          setDebugInfo(`✅ Direct fetch successful: ${data.data.length} predictions`);
        } else {
          setDebugInfo('📭 No predictions found via direct fetch');
          setHistory([]);
        }
      } catch (fallbackError) {
        setDebugInfo(`❌ All methods failed: ${fallbackError.message}`);
        setHistory([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const testAPI = async () => {
    try {
      setDebugInfo('Testing API connection...');
      const response = await fetch('https://wound-assitant-backend.onrender.com/api/predictions');
      const data = await response.json();
      setDebugInfo(`API test successful: ${data.data?.length || 0} predictions found`);
      console.log('API test response:', data);
      
      if (data.data && data.data.length > 0) {
        setHistory(data.data);
      }
    } catch (error) {
      setDebugInfo(`API test failed: ${error.message}`);
      console.error('API test error:', error);
      
      // Try alternative URL
      try {
        setDebugInfo('Trying alternative URL...');
        const altResponse = await fetch('https://wound-assitant-backend.onrender.com/api/predictions?populate=*');
        const altData = await altResponse.json();
        setDebugInfo(`Alternative URL successful: ${altData.data?.length || 0} predictions`);
        if (altData.data && altData.data.length > 0) {
          setHistory(altData.data);
        }
      } catch (altError) {
        setDebugInfo(`Alternative URL also failed: ${altError.message}`);
      }
    }
  };

  const testAllAPIs = async () => {
    try {
      setDebugInfo('Testing all APIs...');
      
      // Test Strapi backend
      const strapiResponse = await fetch('https://wound-assitant-backend.onrender.com/api/predictions');
      const strapiData = await strapiResponse.json();
      
      // Test wound model API
      const modelResponse = await fetch('https://wound-model-api.onrender.com/health');
      const modelData = await modelResponse.json();
      
      setDebugInfo(`Strapi: ${strapiData.data?.length || 0} predictions, Model: ${modelData.status || 'unknown'}`);
      
      if (strapiData.data && strapiData.data.length > 0) {
        setHistory(strapiData.data);
      }
    } catch (error) {
      setDebugInfo(`API test failed: ${error.message}`);
    }
  };

  const loadMockData = () => {
    const mockPredictions = [
      {
        id: '1',
        documentId: new Date().toISOString(),
        prediction: 'Healing',
        predictionConfidence: 0.85,
        predictionStatus: 'completed',
        image: { data: { attributes: { url: '/uploads/wound1.jpg' } } },
        recommendations: 'Continue monitoring',
        user: { id: 1, name: 'Test User' }
      },
      {
        id: '2',
        documentId: new Date(Date.now() - 86400000).toISOString(),
        prediction: 'Normal',
        predictionConfidence: 0.92,
        predictionStatus: 'completed',
        image: { data: { attributes: { url: '/uploads/wound2.jpg' } } },
        recommendations: 'Wound appears healthy',
        user: { id: 1, name: 'Test User' }
      }
    ];
    setHistory(mockPredictions);
    setDebugInfo('Loaded mock data for testing');
  };

  const testCreatePrediction = async () => {
    try {
      setDebugInfo('Creating test prediction...');
      
      const testPrediction = {
        image: "1", // Use a default image ID
        user: "1", // Use a default user ID
        prediction: "Normal",
        predictionConfidence: 0.85,
        recommendations: "Wound appears to be healing normally"
      };
      
      const result = await PredictionHandler.createPrediction(testPrediction);
      setDebugInfo(`Prediction created successfully: ${result.id}`);
      
      // Reload history to show the new prediction
      await loadHistory();
    } catch (error) {
      setDebugInfo(`Failed to create prediction: ${error.message}`);
      console.error('Test prediction creation error:', error);
    }
  };

  const createSamplePredictions = async () => {
    try {
      setDebugInfo('Creating sample predictions...');
      
      const samplePredictions = [
        {
          image: "1",
          user: "1",
          prediction: "Healing",
          predictionConfidence: 0.78,
          recommendations: "Continue current treatment plan"
        },
        {
          image: "2", 
          user: "1",
          prediction: "Infected",
          predictionConfidence: 0.92,
          recommendations: "Seek immediate medical attention"
        },
        {
          image: "3",
          user: "1", 
          prediction: "Normal",
          predictionConfidence: 0.95,
          recommendations: "Wound healing well, maintain hygiene"
        }
      ];
      
      for (const prediction of samplePredictions) {
        await PredictionHandler.createPrediction(prediction);
      }
      
      setDebugInfo('Sample predictions created successfully');
      await loadHistory();
    } catch (error) {
      setDebugInfo(`Failed to create samples: ${error.message}`);
    }
  };

  const testMinimalPrediction = async () => {
    try {
      setDebugInfo('Testing minimal prediction...');
      
      // Try with absolute minimal data
      const minimalData = {
        prediction: "Normal",
        predictionConfidence: 0.85
      };
      
      console.log('Sending minimal data:', minimalData);
      
      const response = await fetch('https://wound-assitant-backend.onrender.com/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: minimalData
        })
      });
      
      const result = await response.json();
      console.log('Minimal test response:', result);
      
      if (response.ok) {
        setDebugInfo(`Minimal test successful: ${result.data?.id}`);
        await loadHistory();
      } else {
        setDebugInfo(`Minimal test failed: ${response.status} - ${JSON.stringify(result)}`);
      }
    } catch (error) {
      setDebugInfo(`Minimal test error: ${error.message}`);
      console.error('Minimal test error:', error);
    }
  };

  const createRealTestPredictions = async () => {
    try {
      setDebugInfo('Creating real test predictions with proper data...');
      
      const realTestPredictions = [
        {
          image: "1",
          user: "1",
          prediction: "Healing",
          predictionConfidence: 0.78,
          recommendations: "Continue current treatment plan | Keep wound clean and dry | Monitor for any changes"
        },
        {
          image: "2", 
          user: "1",
          prediction: "Infected",
          predictionConfidence: 0.92,
          recommendations: "Seek immediate medical attention | Do not apply any creams | Keep area clean"
        },
        {
          image: "3",
          user: "1", 
          prediction: "Normal",
          predictionConfidence: 0.95,
          recommendations: "Wound healing well | Maintain good hygiene | Continue current care routine"
        },
        {
          image: "4",
          user: "1",
          prediction: "Healing",
          predictionConfidence: 0.87,
          recommendations: "Slight improvement noted | Continue monitoring | Follow up with healthcare provider"
        }
      ];
      
      for (const prediction of realTestPredictions) {
        await PredictionHandler.createPrediction(prediction);
      }
      
      setDebugInfo('Real test predictions created successfully!');
      await loadHistory();
    } catch (error) {
      setDebugInfo(`Failed to create real predictions: ${error.message}`);
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

  const getPredictionColor = (prediction: string) => {
    switch (prediction.toLowerCase()) {
      case 'infected':
        return Colors.light.danger;
      case 'healing':
        return Colors.light.success;
      case 'normal':
        return Colors.light.primary;
      default:
        return Colors.light.gray[500];
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Unknown date';
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  const getImageUrl = (image: any) => {
    if (image?.data?.attributes?.url) {
      return `https://wound-assitant-backend.onrender.com${image.data.attributes.url}`;
    }
    return null;
  };

  const renderItem = ({ item }: { item: IPrediction }) => {
    const imageUrl = getImageUrl(item.image);
    console.log('Rendering item:', item);
    
    return (
      <TouchableOpacity
        style={[SharedStyles.card, styles.historyCard]}
        onPress={() => {
          const itemRecommendations = item.recommendations ? 
            (Array.isArray(item.recommendations) 
              ? item.recommendations.join('|') 
              : item.recommendations) : 
            '';
          
          router.push({
            pathname: '/history/result',
            params: {
              imageUri: imageUrl || '',
              result: item.prediction,
              confidence: item.predictionConfidence.toString(),
              predictionId: item.id,
              recommendations: itemRecommendations,
            },
          });
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📷</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.classification}>
              {item.prediction || 'Unknown'}
            </Text>
            <Text style={styles.timestamp}>
              {formatDate(item.documentId || '')}
            </Text>
            <View style={styles.urgencyContainer}>
              <View
                style={[
                  styles.urgencyBadge,
                  {
                    backgroundColor: getPredictionColor(item.prediction || ''),
                  },
                ]}
              >
                <Text style={styles.urgencyText}>
                  {((item.predictionConfidence || 0) * 100).toFixed(1)}%
                </Text>
              </View>
            </View>
            {item.recommendations && (
              <Text style={styles.recommendationsPreview} numberOfLines={2}>
                {typeof item.recommendations === 'string' 
                  ? item.recommendations.split(' | ')[0] // Show first recommendation
                  : Array.isArray(item.recommendations) 
                    ? item.recommendations[0] 
                    : 'View details for recommendations'}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppLayout useScrollView={false}>
      <View style={styles.header}>
        <Text style={SharedStyles.title}>Analysis History</Text>
        <Text style={SharedStyles.subtitle}>
          Review your past wound analyses and track healing progress
        </Text>
        {debugInfo && (
          <Text style={styles.debugInfo}>{debugInfo}</Text>
        )}
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {loading ? '🔄 Loading your history...' : '📭 No wound analyses yet. Create test data or take a photo to get started!'}
            </Text>
            {!loading && (
              <View style={styles.testButtons}>
                <TouchableOpacity
                  style={styles.testButton}
                  onPress={loadHistory}
                >
                  <Text style={styles.testButtonText}>Reload History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, styles.testButtonSecondary]}
                  onPress={testAPI}
                >
                  <Text style={styles.testButtonText}>Test API</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.success }]}
                  onPress={testAllAPIs}
                >
                  <Text style={styles.testButtonText}>Test All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.danger }]}
                  onPress={loadMockData}
                >
                  <Text style={styles.testButtonText}>Mock Data</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.primary }]}
                  onPress={testCreatePrediction}
                >
                  <Text style={styles.testButtonText}>Create Prediction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.warning }]}
                  onPress={testMinimalPrediction}
                >
                  <Text style={styles.testButtonText}>Minimal Prediction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.success }]}
                  onPress={createSamplePredictions}
                >
                  <Text style={styles.testButtonText}>Create Samples</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.testButton, { backgroundColor: Colors.light.info }]}
                  onPress={createRealTestPredictions}
                >
                  <Text style={styles.testButtonText}>Create Real Test Predictions</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  debugInfo: {
    fontSize: 12,
    color: Colors.light.gray[600],
    backgroundColor: Colors.light.gray[100],
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  list: {
    padding: 20,
  },
  historyCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.light.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  classification: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.light.gray[500],
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
  recommendationsPreview: {
    fontSize: 12,
    color: Colors.light.gray[600],
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.gray[500],
    textAlign: 'center',
  },
  testButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  testButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  testButtonSecondary: {
    backgroundColor: Colors.light.gray[500],
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
}); 