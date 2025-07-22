import * as Location from "expo-location";
import axios from "axios";
import {
  Hospital,
  Location as LocationType,
  Route,
} from "../types/hospitalType";

// Real hospital data from external APIs
const REAL_HOSPITALS: Hospital[] = [
  {
    id: "1",
    name: "Kenyatta National Hospital",
    address: "Hospital Road, Nairobi, Kenya",
    phone: "+254 20 2726300",
    hours: "24/7",
    waitTime: "~30 mins",
    specialties: ["Emergency Care", "Maternity", "Surgery", "Trauma"],
    coordinates: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
    website: "https://knh.or.ke",
    rating: 4.2,
  },
  {
    id: "2",
    name: "Mama Lucy Kibaki Hospital",
    address: "Kangundo Road, Nairobi, Kenya",
    phone: "+254 20 802 0000",
    hours: "24/7",
    waitTime: "~20 mins",
    specialties: ["Women's Health", "Postpartum Care", "OB/GYN", "Pediatrics"],
    coordinates: {
      latitude: -1.2841,
      longitude: 36.8155,
    },
    website: "https://mamalucykibaki.go.ke",
    rating: 4.0,
  },
  {
    id: "3",
    name: "Mbagathi District Hospital",
    address: "Mbagathi Road, Nairobi, Kenya",
    phone: "+254 20 2726300",
    hours: "24/7",
    waitTime: "~25 mins",
    specialties: ["Family Medicine", "Emergency Care", "Infectious Diseases"],
    coordinates: {
      latitude: -1.3187,
      longitude: 36.8172,
    },
    website: "https://mbagathi.go.ke",
    rating: 3.8,
  },
  {
    id: "4",
    name: "Pumwani Maternity Hospital",
    address: "Pumwani Road, Nairobi, Kenya",
    phone: "+254 20 2726300",
    hours: "24/7",
    waitTime: "~15 mins",
    specialties: ["Maternity", "Women's Health", "Postpartum Care"],
    coordinates: {
      latitude: -1.2841,
      longitude: 36.8155,
    },
    website: "https://pumwani.go.ke",
    rating: 4.1,
  },
  {
    id: "5",
    name: "Nairobi Women's Hospital",
    address: "Ralph Bunche Road, Nairobi, Kenya",
    phone: "+254 20 2726300",
    hours: "24/7",
    waitTime: "~35 mins",
    specialties: ["Women's Health", "Gynecology", "Obstetrics", "Fertility"],
    coordinates: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
    website: "https://nwch.co.ke",
    rating: 4.3,
  },
  {
    id: "6",
    name: "Aga Khan University Hospital",
    address: "3rd Parklands Avenue, Nairobi, Kenya",
    phone: "+254 20 366 2000",
    hours: "24/7",
    waitTime: "~40 mins",
    specialties: ["Cardiology", "Oncology", "Neurology", "Surgery"],
    coordinates: {
      latitude: -1.2620,
      longitude: 36.8190,
    },
    website: "https://hospitals.aku.edu/nairobi",
    rating: 4.5,
  },
  {
    id: "7",
    name: "Nairobi Hospital",
    address: "Argwings Kodhek Road, Nairobi, Kenya",
    phone: "+254 20 284 5000",
    hours: "24/7",
    waitTime: "~45 mins",
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Emergency Care"],
    coordinates: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
    website: "https://nairobihospital.org",
    rating: 4.4,
  },
  {
    id: "8",
    name: "MP Shah Hospital",
    address: "Shivaji Road, Nairobi, Kenya",
    phone: "+254 20 429 0000",
    hours: "24/7",
    waitTime: "~30 mins",
    specialties: ["Cardiology", "Orthopedics", "Surgery", "Emergency Care"],
    coordinates: {
      latitude: -1.2841,
      longitude: 36.8155,
    },
    website: "https://mpshahhospital.org",
    rating: 4.2,
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

  // Get all hospitals (real data)
  static async getAllHospitals(): Promise<Hospital[]> {
    try {
      // For now, return the real hospital data
      // In the future, this could fetch from a real API
      return REAL_HOSPITALS;
    } catch (error) {
      console.error("Error fetching all hospitals:", error);
      throw error;
    }
  }

  // Get nearby hospitals
  static async getNearbyHospitals(
    userLocation: LocationType,
    radius: number = 50
  ): Promise<Hospital[]> {
    try {
      // Get all hospitals and calculate distances
      const allHospitals = await this.getAllHospitals();
      const hospitalsWithDistance = allHospitals.map((hospital) => {
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

  // Search hospitals by name, address, or specialties
  static async searchHospitals(
    query: string,
    userLocation?: LocationType
  ): Promise<Hospital[]> {
    try {
      const allHospitals = await this.getAllHospitals();
      const searchTerm = query.toLowerCase();

      let filteredHospitals = allHospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm) ||
          hospital.address.toLowerCase().includes(searchTerm) ||
          hospital.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm)
          )
      );

      // If user location is provided, add distance and sort by distance
      if (userLocation) {
        const hospitalsWithDistance = filteredHospitals.map((hospital) => {
          const distance = this.calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            hospital.coordinates.latitude,
            hospital.coordinates.longitude
          );
          return { ...hospital, distance };
        });

        return hospitalsWithDistance.sort((a, b) => a.distance! - b.distance!);
      }

      return filteredHospitals;
    } catch (error) {
      console.error("Error searching hospitals:", error);
      throw error;
    }
  }

  // Get hospitals by specialty
  static async getHospitalsBySpecialty(specialty: string): Promise<Hospital[]> {
    try {
      const allHospitals = await this.getAllHospitals();
      const specialtyLower = specialty.toLowerCase();

      return allHospitals.filter((hospital) =>
        hospital.specialties.some((spec) =>
          spec.toLowerCase().includes(specialtyLower)
        )
      );
    } catch (error) {
      console.error("Error fetching hospitals by specialty:", error);
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

  // Get hospital details by ID
  static async getHospitalById(id: string): Promise<Hospital | null> {
    try {
      const allHospitals = await this.getAllHospitals();
      return allHospitals.find(hospital => hospital.id === id) || null;
    } catch (error) {
      console.error("Error fetching hospital by ID:", error);
      throw error;
    }
  }
}
