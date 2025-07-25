import { IImage } from "@/types/imageType";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import type { ICreatePrediction, IPrediction } from "../types/prediction";
import strapi from "./strapi";

// Retry function with exponential backoff
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Only retry on server errors (5xx) or network errors
      if (error.response?.status >= 500 || error.code === "NETWORK_ERROR" || error.code === "ECONNABORTED") {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // Don't retry on client errors (4xx)
        throw error;
      }
    }
  }
  
  throw lastError;
};

export const PredictionHandler = {
  async createPrediction(
    predictionData: ICreatePrediction
  ): Promise<IPrediction> {
    return retryWithBackoff(async () => {
      try {
        console.log("Creating prediction with data:", predictionData);
        
        // Validate required fields
        if (!predictionData.image) {
          throw new Error("Image ID is required");
        }
        if (!predictionData.user) {
          throw new Error("User ID is required");
        }
        if (!predictionData.prediction) {
          throw new Error("Prediction result is required");
        }
        
        // Ensure all required fields are present and properly formatted
        const cleanData = {
          image: predictionData.image,
          user: predictionData.user,
          prediction: predictionData.prediction,
          predictionConfidence: parseFloat(predictionData.predictionConfidence.toString()),
          recommendations: predictionData.recommendations || 'Continue monitoring your wound and follow healthcare provider advice.',
        };
        
        console.log("Cleaned prediction data:", cleanData);
        
        // Make the API call with proper error handling
        const response = await strapi.post("/predictions", {
          data: cleanData,
        });
        
        console.log("Prediction created successfully:", response.data);
        return response.data;
      } catch (error: any) {
        console.error("Error creating prediction:", error);
        
        // Log detailed error information
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        
        // Provide more specific error messages
        if (error.response?.status === 500) {
          throw new Error("Server error occurred while saving prediction. Please try again.");
        } else if (error.response?.status === 400) {
          throw new Error("Invalid data format. Please try again.");
        } else if (error.response?.status === 401) {
          throw new Error("Authentication required. Please log in again.");
        } else if (error.response?.status === 403) {
          throw new Error("Access denied. Please check your permissions.");
        } else if (error.response?.status === 404) {
          throw new Error("Prediction service not found. Please contact support.");
        } else if (error.code === "NETWORK_ERROR") {
          throw new Error("Network error. Please check your internet connection.");
        } else if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout. Please try again.");
        } else {
          throw new Error(`Failed to save prediction: ${error.message || "Unknown error"}`);
        }
      }
    });
  },

  async uploadImage(img: ImagePickerAsset): Promise<IImage> {
    const formData = new FormData();
    const fileUri = img.uri;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error("File not found");
    }
    formData.append("files", {
      uri: fileUri,
      name: "wound.png",
      type: "image/png",
    } as any);

    const { data } = await strapi.post<IImage[]>("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data[0];
  },

  async getUserPredictions(userId: number): Promise<IPrediction[]> {
    try {
      console.log("Fetching predictions for user:", userId);
      const { data } = await strapi.get("/predictions", {
        params: {
          filters: {
            user: userId,
          },
          populate: ["user", "image"],
          sort: ["createdAt:desc"],
        },
      });
      console.log("API response:", data);
      return data.data;
    } catch (error) {
      console.error("Error fetching user predictions:", error);
      throw error;
    }
  },

  async getPredictionById(predictionId: string): Promise<IPrediction> {
    try {
      const { data } = await strapi.get(`/predictions/${predictionId}`, {
        params: {
          populate: ["user", "image"],
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching prediction:", error);
      throw error;
    }
  },

  async getAllPredictions(): Promise<IPrediction[]> {
    try {
      console.log("Fetching all predictions");
      const { data } = await strapi.get("/predictions", {
        params: {
          populate: ["user", "image"],
          sort: ["createdAt:desc"],
        },
      });
      console.log("All predictions API response:", data);
      return data.data;
    } catch (error) {
      console.error("Error fetching all predictions:", error);
      throw error;
    }
  },

  // Health check for the backend service
  async checkBackendHealth(): Promise<boolean> {
    try {
      // Try to access the predictions endpoint to check if the service is available
      const response = await strapi.get("/predictions", { 
        timeout: 5000,
        params: { _limit: 1 } // Limit to 1 record to minimize data transfer
      });
      return response.status === 200;
    } catch (error: any) {
      console.error("Backend health check failed:", error);
      
      // If it's a 401/403 error, the service is up but we need authentication
      // If it's a 404, the endpoint might not exist but the service could be up
      // If it's a 5xx error, the service is down
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("Backend is available but requires authentication");
        return true; // Service is up, just needs auth
      } else if (error.response?.status === 404) {
        console.log("Backend endpoint not found, but service might be available");
        return true; // Assume service is up, endpoint might be different
      } else if (error.response?.status >= 500) {
        console.log("Backend service is down");
        return false;
      } else if (error.code === "NETWORK_ERROR" || error.code === "ECONNABORTED") {
        console.log("Network error during health check");
        return false;
      }
      
      // For other errors, assume service is available
      return true;
    }
  },
};

export default PredictionHandler;
