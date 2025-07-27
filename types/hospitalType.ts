export interface IHospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  rating?: number;
  distance?: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface IHospitalResponse {
  data: IHospital[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Alias for backward compatibility
export type Hospital = IHospital;

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Route {
  distance: number;
  duration: number;
  coordinates: Location[];
} 