// ==========================================
// PlantCare AI — Type Definitions
// ==========================================

export interface DiagnosisResult {
  diseaseName: string;
  severity: string;
  cause: string;
  treatment: string;
  prevention: string;
  confidence?: number;
  raw?: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  image: string;
  plantType: string;
  result: DiagnosisResult;
}

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface MarketPricePoint {
  month: string;
  price: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  timestamp?: number;
}

export interface OfflineDisease {
  id: string;
  name: string;
  symptoms: string;
  treatment: string;
  keywords: string[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  location: string;
}
