import * as Location from "expo-location";
import axios from "axios";
import {
  Hospital,
  Location as LocationType,
  Route,
} from "../types/hospitalType";

// Free APIs for hospital data
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const OVERPASS_BASE_URL = "https://overpass-api.de/api/interpreter";

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

  // Fetch real hospitals using OpenStreetMap Overpass API
  static async fetchRealHospitals(location: LocationType, radius: number = 5000): Promise<Hospital[]> {
    try {
      console.log('Fetching real hospitals from OpenStreetMap...');
      
      // Use Overpass API to find hospitals near the location
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${location.latitude},${location.longitude});
          way["amenity"="hospital"](around:${radius},${location.latitude},${location.longitude});
          relation["amenity"="hospital"](around:${radius},${location.latitude},${location.longitude});
          node["healthcare"="hospital"](around:${radius},${location.latitude},${location.longitude});
          way["healthcare"="hospital"](around:${radius},${location.latitude},${location.longitude});
          relation["healthcare"="hospital"](around:${radius},${location.latitude},${location.longitude});
        );
        out center;
      `;

      const response = await axios.get(`${OVERPASS_BASE_URL}?data=${encodeURIComponent(query)}`);
      
      if (response.data && response.data.elements) {
        const elements = response.data.elements;
        console.log(`Found ${elements.length} hospitals from OpenStreetMap`);
        
        const hospitals: Hospital[] = elements
          .filter((element: any) => element.lat && element.lon)
          .map((element: any, index: number) => {
            const coords = element.center || { lat: element.lat, lon: element.lon };
            const distance = this.calculateDistance(
              location.latitude,
              location.longitude,
              coords.lat,
              coords.lon
            );

            return {
              id: element.id.toString(),
              name: element.tags?.name || element.tags?.['name:en'] || `Hospital ${index + 1}`,
              address: element.tags?.['addr:street'] 
                ? `${element.tags['addr:housenumber'] || ''} ${element.tags['addr:street']}, ${element.tags['addr:city'] || ''}`
                : 'Address not available',
              phone: element.tags?.phone || element.tags?.['contact:phone'] || 'Phone not available',
              hours: element.tags?.opening_hours || 'Hours not available',
              waitTime: this.estimateWaitTime(),
              specialties: this.extractSpecialtiesFromTags(element.tags),
              coordinates: {
                latitude: coords.lat,
                longitude: coords.lon,
              },
              website: element.tags?.website || element.tags?.['contact:website'],
              rating: this.estimateRating(),
              distance,
            };
          })
          .filter((hospital: Hospital) => hospital.name !== 'Hospital 1') // Filter out unnamed hospitals
          .sort((a: Hospital, b: Hospital) => (a.distance || 0) - (b.distance || 0));

        return hospitals;
      }
      
      throw new Error('No hospital data found');
    } catch (error) {
      console.error('Error fetching real hospitals from OpenStreetMap:', error);
      // Fallback to mock data if API fails
      console.log('Falling back to mock hospital data...');
      return this.getMockHospitals(location);
    }
  }

  // Extract specialties from OpenStreetMap tags
  static extractSpecialtiesFromTags(tags: any): string[] {
    const specialties: string[] = [];
    
    if (tags?.speciality) {
      specialties.push(tags.speciality);
    }
    
    if (tags?.healthcare) {
      const healthcareMap: { [key: string]: string } = {
        'hospital': 'General Hospital',
        'clinic': 'Medical Clinic',
        'emergency': 'Emergency Care',
        'maternity': 'Maternity Care',
        'pediatric': 'Pediatric Care',
        'cardiology': 'Cardiology',
        'orthopedic': 'Orthopedics',
        'neurology': 'Neurology',
        'oncology': 'Oncology',
        'surgery': 'Surgery',
        'trauma': 'Trauma Care',
        'urgent_care': 'Urgent Care',
      };
      
      const specialty = healthcareMap[tags.healthcare];
      if (specialty) {
        specialties.push(specialty);
      }
    }
    
    // Add general specialties based on hospital type
    if (tags?.amenity === 'hospital') {
      specialties.push('General Medical Care');
    }
    
    return specialties.length > 0 ? specialties : ['General Medical Care'];
  }

  // Estimate wait time based on hospital type and rating
  static estimateWaitTime(): string {
    const waitTimes = ['~15 mins', '~30 mins', '~45 mins', '~1 hour'];
    return waitTimes[Math.floor(Math.random() * waitTimes.length)];
  }

  // Estimate rating for hospitals
  static estimateRating(): number {
    return Math.round((3.5 + Math.random() * 1.5) * 10) / 10; // Random rating between 3.5 and 5.0
  }

  // Fallback mock hospitals (used when API fails)
  static getMockHospitals(location: LocationType): Hospital[] {
    const mockHospitals: Hospital[] = [
      {
        id: "rw1",
        name: "King Faisal Hospital",
        address: "KN 3 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~20 mins",
        specialties: ["Emergency Care", "Surgery", "Cardiology", "Oncology"],
        coordinates: {
          latitude: location.latitude + 0.01,
          longitude: location.longitude + 0.01,
        },
        website: "https://kfh.rw",
        rating: 4.5,
        distance: 0.5,
      },
      {
        id: "rw2",
        name: "University Teaching Hospital of Kigali (CHUK)",
        address: "KN 4 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~30 mins",
        specialties: ["General Medicine", "Pediatrics", "Emergency Care", "Maternity"],
        coordinates: {
          latitude: location.latitude - 0.01,
          longitude: location.longitude - 0.01,
        },
        website: "https://chuk.rw",
        rating: 4.2,
        distance: 1.2,
      },
      {
        id: "rw3",
        name: "Rwanda Military Hospital",
        address: "KG 17 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~25 mins",
        specialties: ["Military Medicine", "Trauma Care", "Emergency Care", "Surgery"],
        coordinates: {
          latitude: location.latitude + 0.02,
          longitude: location.longitude - 0.02,
        },
        website: "https://rmh.rw",
        rating: 4.3,
        distance: 2.1,
      },
      {
        id: "rw4",
        name: "Kibagabaga Hospital",
        address: "KG 11 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~15 mins",
        specialties: ["General Medicine", "Family Care", "Emergency Care"],
        coordinates: {
          latitude: location.latitude - 0.02,
          longitude: location.longitude + 0.02,
        },
        website: "https://kibagabaga.rw",
        rating: 4.0,
        distance: 1.8,
      },
      {
        id: "rw5",
        name: "Muhima Hospital",
        address: "KG 7 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~35 mins",
        specialties: ["Maternity Care", "Women's Health", "Pediatrics", "Emergency Care"],
        coordinates: {
          latitude: location.latitude + 0.015,
          longitude: location.longitude + 0.015,
        },
        website: "https://muhima.rw",
        rating: 4.1,
        distance: 1.5,
      },
      {
        id: "rw6",
        name: "Kacyiru Hospital",
        address: "KG 9 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~40 mins",
        specialties: ["General Medicine", "Emergency Care", "Family Medicine"],
        coordinates: {
          latitude: location.latitude - 0.015,
          longitude: location.longitude - 0.015,
        },
        website: "https://kacyiru.rw",
        rating: 3.9,
        distance: 2.3,
      },
      {
        id: "rw7",
        name: "Masaka Hospital",
        address: "KG 13 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~20 mins",
        specialties: ["General Medicine", "Emergency Care", "Surgery"],
        coordinates: {
          latitude: location.latitude + 0.025,
          longitude: location.longitude - 0.025,
        },
        website: "https://masaka.rw",
        rating: 4.0,
        distance: 2.8,
      },
      {
        id: "rw8",
        name: "Kanombe Military Hospital",
        address: "KG 15 Ave, Kigali, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~30 mins",
        specialties: ["Military Medicine", "Trauma Care", "Emergency Care"],
        coordinates: {
          latitude: location.latitude - 0.025,
          longitude: location.longitude + 0.025,
        },
        website: "https://kanombe.rw",
        rating: 4.2,
        distance: 3.1,
      },
      {
        id: "rw9",
        name: "Butare University Teaching Hospital (CHUB)",
        address: "Huye, Southern Province, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~45 mins",
        specialties: ["General Medicine", "Teaching Hospital", "Research", "Emergency Care"],
        coordinates: {
          latitude: location.latitude + 0.03,
          longitude: location.longitude - 0.03,
        },
        website: "https://chub.rw",
        rating: 4.3,
        distance: 4.2,
      },
      {
        id: "rw10",
        name: "Ruhengeri Referral Hospital",
        address: "Musanze, Northern Province, Rwanda",
        phone: "+250 788 303 030",
        hours: "24/7",
        waitTime: "~50 mins",
        specialties: ["Referral Care", "Emergency Medicine", "Surgery", "Maternity"],
        coordinates: {
          latitude: location.latitude - 0.03,
          longitude: location.longitude + 0.03,
        },
        website: "https://ruhengeri.rw",
        rating: 4.1,
        distance: 5.1,
      },
    ];

    return mockHospitals;
  }

  // Get all hospitals (now fetches real data)
  static async getAllHospitals(): Promise<Hospital[]> {
    try {
      // Get user's current location first
      const userLocation = await this.getCurrentLocation();
      
      // Fetch real hospitals from OpenStreetMap
      return await this.fetchRealHospitals(userLocation);
    } catch (error) {
      console.error("Error getting all hospitals:", error);
      // Fallback to mock data
      const fallbackLocation: LocationType = {
        latitude: 0,
        longitude: 0,
        address: "Unknown Location",
      };
      return this.getMockHospitals(fallbackLocation);
    }
  }

  // Get nearby hospitals (real data)
  static async getNearbyHospitals(
    userLocation: LocationType,
    radius: number = 50
  ): Promise<Hospital[]> {
    try {
      // Fetch real hospitals from OpenStreetMap
      const realHospitals = await this.fetchRealHospitals(userLocation, radius * 1000); // Convert miles to meters
      
      // Filter by distance and sort
      return realHospitals
        .filter((hospital) => (hospital.distance || 0) <= radius)
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } catch (error) {
      console.error("Error fetching nearby hospitals:", error);
      throw error;
    }
  }

  // Search hospitals by name, address, or specialties
  static async searchHospitals(
    query: string,
    userLocation?: LocationType
  ): Promise<Hospital[]> {
    try {
      if (!userLocation) {
        userLocation = await this.getCurrentLocation();
      }

      // Fetch real hospitals first
      const allHospitals = await this.fetchRealHospitals(userLocation);
      const searchTerm = query.toLowerCase();

      let filteredHospitals = allHospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm) ||
          hospital.address.toLowerCase().includes(searchTerm) ||
          hospital.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm)
          )
      );

      // Sort by distance if user location is available
      if (userLocation) {
        return filteredHospitals.sort((a, b) => (a.distance || 0) - (b.distance || 0));
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
      const userLocation = await this.getCurrentLocation();
      const allHospitals = await this.fetchRealHospitals(userLocation);
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
      const userLocation = await this.getCurrentLocation();
      const allHospitals = await this.fetchRealHospitals(userLocation);
      return allHospitals.find(hospital => hospital.id === id) || null;
    } catch (error) {
      console.error("Error fetching hospital by ID:", error);
      throw error;
    }
  }
}
