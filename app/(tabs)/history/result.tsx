import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import PredictionHandler from "@/api/prediction";
import { IPrediction } from "@/types/prediction";

export default function HistoryResultScreen() {
  const { imageUri, result, confidence, predictionId, recommendations } = useLocalSearchParams<{
    imageUri: string;
    result: string;
    confidence: string;
    predictionId: string;
    recommendations?: string;
  }>();
  
  const [predictionData, setPredictionData] = useState<IPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [useFallbackData, setUseFallbackData] = useState(false);

  useEffect(() => {
    const loadPredictionDetails = async () => {
      try {
        setLoading(true);
        
        // Always use fallback data from URL parameters since API is unreliable
        setUseFallbackData(true);
        const fallbackData: IPrediction = {
          id: predictionId || 'unknown',
          documentId: new Date().toISOString(),
          prediction: result || 'Unknown',
          predictionConfidence: parseFloat(confidence) || 0,
          recommendations: recommendations ? 
            (recommendations.includes('|') ? recommendations.split('|').join(' | ') : recommendations) : 
            'Continue monitoring your wound and follow healthcare provider advice.',
          image: null,
          user: null,
        };
        
        setPredictionData(fallbackData);
        setDebugInfo(`Using cached data from URL parameters. Prediction: ${result}, Confidence: ${confidence}%`);
        
        // Try to fetch from API as background task (don't wait for it)
        if (predictionId) {
          try {
            console.log('Attempting to fetch from API for ID:', predictionId);
            const apiPrediction = await PredictionHandler.getPredictionById(predictionId);
            if (apiPrediction) {
              console.log('Successfully fetched from API:', apiPrediction);
              setPredictionData(apiPrediction);
              setUseFallbackData(false);
              setDebugInfo('Successfully loaded from API');
            }
          } catch (apiError) {
            console.log('API fetch failed, keeping fallback data:', apiError.message);
            // Keep the fallback data, don't show error to user
          }
        }
        
      } catch (error) {
        console.error("Error in loadPredictionDetails:", error);
        setDebugInfo(`Error: ${error.message}. Using fallback data.`);
        
        // Ensure we always have some data to show
        const emergencyFallback: IPrediction = {
          id: predictionId || 'unknown',
          documentId: new Date().toISOString(),
          prediction: result || 'Unknown',
          predictionConfidence: parseFloat(confidence) || 0,
          recommendations: 'Unable to load specific recommendations. Please consult your healthcare provider.',
          image: null,
          user: null,
        };
        setPredictionData(emergencyFallback);
        setUseFallbackData(true);
      } finally {
        setLoading(false);
      }
    };

    loadPredictionDetails();
  }, [predictionId, result, confidence, recommendations, imageUri]);

  const handleClose = () => {
    router.back();
  };

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
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading prediction details...</Text>
        </View>
      </AppLayout>
    );
  }

  if (!predictionData) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load prediction details</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Analysis Results</Text>
          {useFallbackData && (
            <Text style={styles.fallbackNotice}>Using cached data</Text>
          )}
          <Text style={styles.subtitle}>
            {formatDate(predictionData.documentId)}
          </Text>
          {debugInfo && (
            <Text style={styles.debugInfo}>{debugInfo}</Text>
          )}
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.resultCard}>
          <View style={styles.predictionHeader}>
            <Text style={styles.predictionLabel}>
              {predictionData.prediction}
            </Text>
            <View
              style={[
                styles.confidenceBadge,
                {
                  backgroundColor: getPredictionColor(predictionData.prediction),
                },
              ]}
            >
              <Text style={styles.confidenceText}>
                {(predictionData.predictionConfidence * 100).toFixed(1)}%
              </Text>
            </View>
          </View>
          
          <Text style={styles.confidenceLabel}>
            Confidence Level
          </Text>
        </View>

        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Original Analysis & Recommendations</Text>
          <Text style={styles.recommendationsText}>
            {predictionData.recommendations ? 
              (Array.isArray(predictionData.recommendations) 
                ? predictionData.recommendations.map((rec, index) => `• ${rec}`).join('\n')
                : typeof predictionData.recommendations === 'string'
                  ? predictionData.recommendations.split(' | ').map((rec, index) => `• ${rec}`).join('\n')
                  : JSON.stringify(predictionData.recommendations))
              : 'No specific recommendations were provided for this analysis. Continue monitoring your wound and consult your healthcare provider if needed.'
            }
          </Text>
        </View>

        <View style={styles.analysisCard}>
          <Text style={styles.analysisTitle}>Analysis Summary</Text>
          <View style={styles.analysisRow}>
            <Text style={styles.analysisLabel}>Wound Status:</Text>
            <Text style={[styles.analysisValue, { color: getPredictionColor(predictionData.prediction) }]}>
              {predictionData.prediction}
            </Text>
          </View>
          <View style={styles.analysisRow}>
            <Text style={styles.analysisLabel}>Confidence:</Text>
            <Text style={styles.analysisValue}>
              {(predictionData.predictionConfidence * 100).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.analysisRow}>
            <Text style={styles.analysisLabel}>Analysis Date:</Text>
            <Text style={styles.analysisValue}>
              {formatDate(predictionData.documentId)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back to History"
            variant="primary"
            onPress={handleClose}
            style={styles.closeButton}
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.light.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.background,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.background,
    textAlign: "center",
    marginTop: 4,
    opacity: 0.8,
  },
  debugInfo: {
    fontSize: 10,
    color: Colors.light.background,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 4,
    borderRadius: 4,
  },
  fallbackNotice: {
    fontSize: 12,
    color: Colors.light.background,
    textAlign: "center",
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 4,
    borderRadius: 4,
    fontWeight: '600',
  },
  imageContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
  },
  resultCard: {
    backgroundColor: Colors.light.background,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  predictionLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.light.text,
    flex: 1,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  confidenceLabel: {
    fontSize: 14,
    color: Colors.light.gray[500],
    textAlign: 'center',
  },
  recommendationsCard: {
    backgroundColor: Colors.light.background,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 10,
  },
  recommendationsText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  analysisCard: {
    backgroundColor: Colors.light.background,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 15,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.gray[200],
  },
  analysisLabel: {
    fontSize: 14,
    color: Colors.light.gray[600],
    fontWeight: '500',
  },
  analysisValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  closeButton: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 100,
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.danger,
    textAlign: "center",
    marginTop: 100,
  },
});
