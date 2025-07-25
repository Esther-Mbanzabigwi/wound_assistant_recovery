import api from "@/api";
import PredictionHandler from "@/api/prediction";
import { useAuthContext } from "@/context/authcontext";
import { IImage } from "@/types/imageType";
import { ICreatePrediction } from "@/types/prediction";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

export default function CaptureScreen() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Camera permission is required to take photos."
        );
      }
    })();
  }, []);

  const analyzeWound = async () => {
    try {
      setLoading(true);
      
      // Always proceed with analysis - don't let backend health check block it
      console.log("Starting image analysis...");
      
      let strapiImage;
      try {
        // Try to upload image to Strapi
        strapiImage = (await PredictionHandler.uploadImage(image!)) as IImage;
        console.log("Image uploaded successfully:", strapiImage.id);
      } catch (uploadError) {
        console.error("Failed to upload image to Strapi:", uploadError);
        // Create a temporary image object if upload fails
        strapiImage = {
          id: "temp_" + Date.now(),
          url: image!.uri,
          name: "wound.jpg",
          size: 0,
          mime: "image/jpeg",
        } as IImage;
      }
      
      // Always try to analyze with AI model
      const prediction = await api.classifyWound(image!);
      console.log("AI Analysis result:", prediction);
      
      // Format recommendations properly for storage
      const formattedRecommendations = Array.isArray(prediction.recommendations) 
        ? prediction.recommendations.join(' | ')
        : prediction.recommendations || 'Continue monitoring your wound and follow healthcare provider advice.';
      
      const newPrediction: ICreatePrediction = {
        image: strapiImage.id.toString(),
        user: user?.documentId?.toString() || "1", // Default to user 1 if no user ID
        recommendations: formattedRecommendations,
        prediction: prediction.predicted_class!,
        predictionConfidence: prediction.confidence!,
      };
      console.log("Prediction data:", newPrediction);
      
      let createdPrediction;
      try {
        createdPrediction = await PredictionHandler.createPrediction(newPrediction);
        console.log("Prediction saved to database:", createdPrediction.id);
      } catch (dbError: any) {
        console.error("Failed to save prediction to database:", dbError);
        // Create a temporary prediction object for navigation
        createdPrediction = {
          id: "temp_" + Date.now(),
          documentId: "temp_" + Date.now(),
          image: strapiImage,
          predictionConfidence: prediction.confidence!,
          user: user || { id: "1", documentId: "1" } as any,
          recommendations: formattedRecommendations,
          prediction: prediction.predicted_class!,
        };
        
        // Show warning but continue with the analysis
        Alert.alert(
          "Analysis Complete",
          "Your wound has been analyzed successfully! There was an issue saving to your history, but you can still view the results.",
          [{ text: "Continue", style: "default" }]
        );
      }
      
      // Navigate to result screen with prediction data
      router.push({
        pathname: "/capture/result",
        params: {
          imageUri: image!.uri,
          result: prediction.predicted_class!,
          confidence: prediction.confidence!.toString(),
          predictionId: createdPrediction.id,
          recommendations: Array.isArray(prediction.recommendations) 
            ? prediction.recommendations.join('|') 
            : prediction.recommendations || '',
        },
      });
    } catch (error: any) {
      console.error("Analysis failed:", error);
      console.log("Full error details:", JSON.stringify(error, null, 2));
      
      let errorMessage = "Failed to analyze wound. Please try again.";
      
      // Provide more specific error messages
      if (error.message) {
        if (error.message.includes("File not found")) {
          errorMessage = "Image file not found. Please take a new photo.";
        } else if (error.message.includes("Server error occurred")) {
          errorMessage = "Server error. Please try again in a few minutes.";
        } else if (error.message.includes("Network error")) {
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timeout. Please try again.";
        } else if (error.message.includes("Invalid data format")) {
          errorMessage = "Data format error. Please try again.";
        } else if (error.message.includes("Authentication required")) {
          errorMessage = "Please log in again to continue.";
        } else if (error.message.includes("Access denied")) {
          errorMessage = "Access denied. Please check your account permissions.";
        } else if (error.message.includes("Model API Error")) {
          errorMessage = "AI analysis failed. Please try again with a different image.";
        }
      }
      
      Alert.alert("Analysis Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
        analyzeWound();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
        analyzeWound();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  return (
    <AppLayout scrollEnabled={false}>
      <View style={styles.captureArea}>
        {image ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraIcon}>📸</Text>
            <Text style={styles.captureText}>Track My Recovery</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={styles.loadingText}>Processing your photo...</Text>
          </View>
        ) : (
          <View style={styles.actions}>
            <Button
              title="Take Photo"
              variant="primary"
              onPress={takePhoto}
              style={styles.button}
            />
            <Text style={styles.orText}>or</Text>
            <Button
              title="Choose from Gallery"
              variant="secondary"
              onPress={pickImage}
              style={styles.button}
            />
          </View>
        )}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  captureArea: {
    flex: 1,
    justifyContent: "center",
    gap: 32,
  },
  cameraPlaceholder: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  captureText: {
    fontSize: 18,
    color: Colors.light.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  imagePreview: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: 4 / 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  actions: {
    gap: 16,
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  orText: {
    color: Colors.light.gray[500],
    fontSize: 16,
  },
  loading: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.gray[500],
  },
}); 