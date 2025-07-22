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
  const { imageUri, result, confidence, predictionId } = useLocalSearchParams<{
    imageUri: string;
    result: string;
    confidence: string;
    predictionId: string;
  }>();
  
  const [predictionData, setPredictionData] = useState<IPrediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictionDetails = async () => {
      try {
        setLoading(true);
        if (predictionId) {
          const prediction = await PredictionHandler.getPredictionById(predictionId);
          setPredictionData(prediction);
        }
      } catch (error) {
        console.error("Error loading prediction details:", error);
        Alert.alert("Error", "Failed to load prediction details");
      } finally {
        setLoading(false);
      }
    };

    loadPredictionDetails();
  }, [predictionId]);

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
          <Text style={styles.subtitle}>
            {formatDate(predictionData.documentId)}
          </Text>
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

        {predictionData.recommendations && (
          <View style={styles.recommendationsCard}>
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
            <Text style={styles.recommendationsText}>
              {typeof predictionData.recommendations === 'string' 
                ? predictionData.recommendations 
                : JSON.stringify(predictionData.recommendations)}
            </Text>
          </View>
        )}

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
