export interface ICreatePrediction {
  image: string;
  user: string;
  prediction: string;
  predictionConfidence: number;
  recommendations: string | string[];
  predictionStatus?: string;
}

export interface IPrediction {
  id: string;
  image: string;
  user: string;
  prediction: string;
  predictionConfidence: number;
  recommendations: string | string[];
  predictionStatus?: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  attributes?: {
    image: string;
    user: string;
    prediction: string;
    predictionConfidence: number;
    recommendations: string | string[];
    predictionStatus?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
} 