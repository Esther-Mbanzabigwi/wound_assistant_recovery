import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const strapi = axios.create({
  baseURL: `http://localhost:1337/api`,
  timeout: 10000,
});

// Add request interceptor to include auth token
strapi.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default strapi;
