import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PredictionResult {
  id: string;
  imageUri: string;
  result: string;
  confidence: number;
  timestamp: Date;
}

interface PredictionContextType {
  predictions: PredictionResult[];
  addPrediction: (prediction: Omit<PredictionResult, 'id' | 'timestamp'>) => void;
  getPredictionById: (id: string) => PredictionResult | undefined;
  clearPredictions: () => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const usePredictionContext = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePredictionContext must be used within a PredictionProvider');
  }
  return context;
};

interface PredictionProviderProps {
  children: ReactNode;
}

export const PredictionProvider: React.FC<PredictionProviderProps> = ({ children }) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);

  const addPrediction = (prediction: Omit<PredictionResult, 'id' | 'timestamp'>) => {
    const newPrediction: PredictionResult = {
      ...prediction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setPredictions(prev => [newPrediction, ...prev]);
  };

  const getPredictionById = (id: string) => {
    return predictions.find(prediction => prediction.id === id);
  };

  const clearPredictions = () => {
    setPredictions([]);
  };

  const value: PredictionContextType = {
    predictions,
    addPrediction,
    getPredictionById,
    clearPredictions,
  };

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  );
}; 