import strapi from './strapi';
import { Platform } from 'react-native';

// Configuration
const API_CONFIG = {
  STRAPI_URL: Platform.select({
    ios: 'http://192.168.1.68:1337/api',
    android: 'http://192.168.1.68:1337/api',
  }),
  MODEL_URL: Platform.select({
    ios: 'http://192.168.1.68:8502',
    android: 'http://192.168.1.68:8502',
  }),
};

// Types
export interface WoundPrediction {
  predicted_class: string;
  confidence: number;
  urgency_level: 'HIGH' | 'MEDIUM' | 'LOW';
  requires_hospital: boolean;
  recommendations: string[];
  class_probabilities: Record<string, number>;
}

// API Service
export const api = {
  // Wound Classification
  classifyWound: async (imageUri: string): Promise<WoundPrediction> => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'wound_image.jpg',
    } as any);

    const response = await fetch(`${API_CONFIG.MODEL_URL}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to classify wound');
    }

    return response.json();
  },

  // Health check for model server
  checkModelHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.MODEL_URL}/health`);
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      console.error('Model server health check failed:', error);
      return false;
    }
  },

  // Strapi endpoints
  auth: {
    login: async (identifier: string, password: string) => {
      const response = await strapi.post('/auth/local', {
        identifier,
        password,
      });
      return response.data;
    },
    register: async (username: string, email: string, password: string) => {
      const response = await strapi.post('/auth/local/register', {
        username,
        email,
        password,
      });
      return response.data;
    },
  },

  predictions: {
    save: async (predictionData: any) => {
      const response = await strapi.post('/predictions', {
        data: predictionData,
      });
      return response.data;
    },
    getHistory: async () => {
      const response = await strapi.get('/predictions');
      return response.data;
    },
  },
};
export default api;

