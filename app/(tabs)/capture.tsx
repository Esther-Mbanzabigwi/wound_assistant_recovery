import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import Button from '../../components/ui/Button';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import api from '../../api';

export default function CaptureScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos.');
      }
    })();
  }, []);

  const analyzeWound = async (imageUri: string) => {
    try {
      setLoading(true);
      
      // Check if model server is available
      const isHealthy = await api.checkModelHealth();
      if (!isHealthy) {
        throw new Error('Model server is not available');
      }

      // Classify wound
      const prediction = await api.classifyWound(imageUri);
      
      // Save prediction to Strapi
      await api.predictions.save({
        imageUrl: imageUri,
        classification: prediction.predicted_class,
        confidence: prediction.confidence,
        urgencyLevel: prediction.urgency_level,
        requiresHospital: prediction.requires_hospital,
        recommendations: prediction.recommendations,
        timestamp: new Date().toISOString(),
      });

      // Navigate to results
      router.push({
        pathname: '/results',
        params: {
          prediction: JSON.stringify(prediction),
          imageUri,
        },
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to analyze wound. Please check your internet connection and try again.'
      );
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
        setImage(result.assets[0].uri);
        analyzeWound(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
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
        setImage(result.assets[0].uri);
        analyzeWound(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.captureArea}>
        {image ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraIcon}>📸</Text>
            <Text style={styles.captureText}>Track My Recovery</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#D23669" />
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  captureArea: {
    flex: 1,
    justifyContent: 'center',
    gap: 32,
  },
  cameraPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
    color: '#D23669',
    fontWeight: '600',
    textAlign: 'center',
  },
  imagePreview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    aspectRatio: 4/3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  actions: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  orText: {
    color: '#666',
    fontSize: 16,
  },
  loading: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
}); 