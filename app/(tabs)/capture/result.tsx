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

export default function CaptureResultScreen() {
  const { imageUri, result, confidence, predictionId, recommendations } = useLocalSearchParams<{
    imageUri: string;
    result: string;
    confidence: string;
    predictionId: string;
    recommendations?: string;
  }>();
  
  const [predictionData, setPredictionData] = useState<{
    result: string;
    confidence: number;
    recommendations?: string | string[];
  } | null>(null);

  useEffect(() => {
    if (imageUri && result && confidence) {
      try {
        const confidenceValue = parseFloat(confidence);
        const parsedRecommendations = recommendations ? 
          (recommendations.includes('|') ? recommendations.split('|') : recommendations) : 
          undefined;
        
        setPredictionData({
          result,
          confidence: confidenceValue,
          recommendations: parsedRecommendations,
        });
      } catch (error) {
        console.error("Error parsing prediction data:", error);
        Alert.alert("Error", "Failed to load prediction results");
      }
    }
  }, [imageUri, result, confidence, recommendations]);

  const handleClose = () => {
    router.back();
  };

  if (!predictionData || !imageUri) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading results...</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Analysis Results</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.predictionLabel}>
            {predictionData.result}
          </Text>
          <Text style={styles.confidenceText}>
            Confidence: {(predictionData.confidence * 100).toFixed(1)}%
          </Text>
        </View>

        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          <Text style={styles.recommendationsText}>
            {predictionData.recommendations ? 
              (Array.isArray(predictionData.recommendations) 
                ? predictionData.recommendations.join('\n• ')
                : predictionData.recommendations)
              : `Your wound appears to be ${predictionData.result.toLowerCase()}. Continue monitoring and follow your healthcare provider's advice.`
            }
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Close"
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
  predictionLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 10,
    textAlign: "center",
  },
  confidenceText: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    opacity: 0.8,
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
});
