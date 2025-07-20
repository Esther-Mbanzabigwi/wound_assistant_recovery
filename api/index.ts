import axios from "axios";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";

const modelUrl = "https://wound-model-api.onrender.com";
// const modelUrl = "http://0.0.0.0:8502";

// Types
export interface WoundPrediction {
  predicted_class: string;
  confidence: number;
  urgency_level: "HIGH" | "MEDIUM" | "LOW";
  requires_hospital: boolean;
  recommendations: string[];
  class_probabilities: Record<string, number>;
}

// API Service
const api = {
  classifyWound: async (image: ImagePickerAsset): Promise<WoundPrediction> => {
    const formData = new FormData();

    const fileUri = image.uri;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      throw new Error("File not found");
    }

    // Append file to form data
    formData.append("file", {
      uri: fileUri,
      name: "wound.jpg",
      type: "image/jpeg",
    } as any);

    const response = await axios.post(`${modelUrl}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export default api;
