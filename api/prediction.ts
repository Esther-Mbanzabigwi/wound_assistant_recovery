import { IImage } from "@/types/imageType";
import * as FileSystem from "expo-file-system";
import { ImagePickerAsset } from "expo-image-picker";
import type { ICreatePrediction, IPrediction } from "../types/prediction";
import strapi from "./strapi";

export const PredictionHandler = {
  async createPrediction(
    predictionData: ICreatePrediction
  ): Promise<IPrediction> {
    try {
      const { data } = await strapi.post("/predictions", {
        data: predictionData,
      });
      return data;
    } catch (error) {
      console.error("Error creating prediction:", error);
      throw error;
    }
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
      const { data } = await strapi.get("/predictions", {
        params: {
          filters: {
            user: userId,
          },
          populate: ["user", "image"],
          sort: ["createdAt:desc"],
        },
      });
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
      const { data } = await strapi.get("/predictions", {
        params: {
          populate: ["user", "image"],
          sort: ["createdAt:desc"],
        },
      });
      return data.data;
    } catch (error) {
      console.error("Error fetching all predictions:", error);
      throw error;
    }
  },
};

export default PredictionHandler;
