export interface Prediction {
  id: number;
  timestamp: string;
  brand: string;
  model: string;
  confidence: number;
}

export interface DetectionResult {
  brand: string;
  confidence: number;
  model?: string;
}