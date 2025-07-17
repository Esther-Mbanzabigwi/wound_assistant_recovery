import * as Location from "expo-location";
import {
  Hospital,
  Location as LocationType,
  Route,
} from "../types/hospitalType";

// Mock hospital data - in a real app, this would come from an API
const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "1",
    name: "City General Hospital",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    hours: "24/7",
    waitTime: "~15 mins",
    specialties: ["Emergency Care", "Maternity", "Surgery"],
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  {
    id: "2",
    name: "Women's Health Center",
    address: "456 Oak Avenue, Midtown",
    phone: "(555) 987-6543",
    hours: "6 AM - 10 PM",
    waitTime: "~30 mins",
    specialties: ["Women's Health", "Postpartum Care", "OB/GYN"],
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
  },
  {
    id: "3",
    name: "Community Medical Center",
    address: "789 Pine Street, Uptown",
    phone: "(555) 456-7890",
    hours: "7 AM - 11 PM",
    waitTime: "~45 mins",
    specialties: ["Family Medicine", "Pediatrics", "Emergency Care"],
    coordinates: {
      latitude: 37.7649,
      longitude: -122.4294,
    },
  },
  {
    id: "4",
    name: "Regional Trauma Center",
    address: "321 Elm Street, Westside",
    phone: "(555) 789-0123",
    hours: "24/7",
    waitTime: "~10 mins",
    specialties: ["Trauma", "Emergency Care", "Critical Care"],
    coordinates: {
      latitude: 37.7549,
      longitude: -122.4394,
    },
  },
];

export class HospitalAPI {
  // Get user's current location
  static async getCurrentLocation(): Promise<LocationType> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission denied");
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Get address from coordinates
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const address = addressResponse[0]
        ? `${addressResponse[0].street}, ${addressResponse[0].city}`
        : "Current Location";

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address,
      };
    } catch (error) {
      console.error("Error getting location:", error);
      throw error;
    }
  }

  // Calculate distance between two points using Haversine formula
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Get nearby hospitals
  static async getNearbyHospitals(
    userLocation: LocationType,
    radius: number = 100000000000000
  ): Promise<Hospital[]> {
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data and filter by distance
      const hospitalsWithDistance = MOCK_HOSPITALS.map((hospital) => {
        const distance = this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          hospital.coordinates.latitude,
          hospital.coordinates.longitude
        );
        return { ...hospital, distance };
      });

      // Filter hospitals within radius and sort by distance
      return hospitalsWithDistance
        .filter((hospital) => hospital.distance! <= radius)
        .sort((a, b) => a.distance! - b.distance!);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      throw error;
    }
  }

  // Search hospitals by name
  static async searchHospitals(
    query: string,
    userLocation: LocationType
  ): Promise<Hospital[]> {
    try {
      const allHospitals = await this.getNearbyHospitals(userLocation, 50);
      const searchTerm = query.toLowerCase();

      return allHospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm) ||
          hospital.address.toLowerCase().includes(searchTerm) ||
          hospital.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm)
          )
      );
    } catch (error) {
      console.error("Error searching hospitals:", error);
      throw error;
    }
  }

  // Get route to hospital (mock implementation)
  static async getRouteToHospital(
    origin: LocationType,
    destination: Hospital
  ): Promise<Route> {
    // In a real app, this would use Google Maps Directions API
    const distance = this.calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.coordinates.latitude,
      destination.coordinates.longitude
    );

    // Mock route data
    return {
      distance,
      duration: Math.round(distance * 2), // Rough estimate: 2 minutes per mile
      polyline: "", // Would contain encoded polyline from Google Maps API
    };
  }

  // Open directions in external maps app
  static openDirections(hospital: Hospital): void {
    const { latitude, longitude } = hospital.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    // In a real app, you'd use Linking.openURL(url)
    console.log("Opening directions:", url);
  }

  // Call hospital
  static callHospital(phone: string): void {
    const url = `tel:${phone}`;
    // In a real app, you'd use Linking.openURL(url)
    console.log("Calling hospital:", url);
  }
}
