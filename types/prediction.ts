import { IUser } from "./usertype";

export interface IPrediction {
  id: string;
  documentId: string;
  image: any;
  predictionConfidence: number;
  user: IUser;
  recommendations: string;
  prediction: string;
}

export interface ICreatePrediction {
  image: string;
  predictionConfidence: number;
  user: string;
  recommendations: string;
  prediction: string;
}
