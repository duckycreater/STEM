import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, Activity, Map as MapIcon, Cpu, Zap, CloudRain, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues with Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SENSOR_DATA = {
  temperature: 28.5,
  humidity: 65,
  soilMoisture: 42,
  ph: 6.2,
  nitrogen: 45,
  phosphorus: 30,
  potassium: 40,
};

const FARM_CENTER: [number, number] = [11.9404, 108.4583];
const FARM_POLYGON: [number, number][] = [
  [11.9410, 108.4578],
  [11.9410, 108.4588],
  [11.9398, 108.4588],
  [11.9398, 108.4578],
];

export default function DashboardPage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `I have IoT sensor data from a farm:
      - Temperature: ${SENSOR_DATA.temperature}°C
      - Air Humidity: ${SENSOR_DATA.humidity}%
      - Soil Moisture: ${SENSOR_DATA.soilMoisture}%
      - Soil pH: ${SENSOR_DATA.ph}
      - N-P-K: ${SENSOR_DATA.nitrogen}-${SENSOR_DATA.phosphorus}-${SENSOR_DATA.potassium} mg/kg
      
      Based on this data, act as an AI agricultural engineer and provide 3 concise, modern, and practical tips to optimize crop yield right now. Reply in English using bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      setAiInsight(response.text || 'Cannot generate analysis at this time.');
    } catch (error) {
      console.error(error);
      setAiInsight('Error connecting to AI system. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsight();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 pt-safe-top sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Cpu size={24} />
            IoT Farm
          </h1>
          <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <MapIcon size={14} />
            <span>Dalat, VN</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-3xl font-light">{SENSOR_DATA.temperature}°C</p>
            <p className="text-emerald-100 text-sm flex items-center gap-1">
              <CloudRain size={14} /> Light rain
            </p>
          </div>
          <Sun size={48} className="text-yellow-300 opacity-90" />
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-6">
        {/* Sensor Grid */}
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity size={16} />
            Real-time Metrics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <SensorCard 
              icon={<Droplets className="text-blue-500" />} 
              label="Soil Moisture" 
              value={`${SENSOR_DATA.soilMoisture}%`} 
              status="Normal"
              progress={SENSOR_DATA.soilMoisture}
              color="bg-blue-500"
            />
            <SensorCard 
              icon={<Wind className="text-teal-500" />} 
              label="Air Humidity" 
              value={`${SENSOR_DATA.humidity}%`} 
              status="Slightly High"
              progress={SENSOR_DATA.humidity}
              color="bg-teal-500"
            />
            <SensorCard 
              icon={<Activity className="text-purple-500" />} 
              label="pH Level" 
              value={SENSOR_DATA.ph} 
              status="Optimal"
              progress={(SENSOR_DATA.ph / 14) * 100}
              color="bg-purple-500"
            />
            <SensorCard 
              icon={<Zap className="text-amber-500" />} 
              label="N-P-K" 
              value={`${SENSOR_DATA.nitrogen}-${SENSOR_DATA.phosphorus}-${SENSOR_DATA.potassium}`} 
              status="Needs N"
              progress={60}
              color="bg-amber-500"
            />
          </div>
        </div>

        {/* AI Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Cpu size={18} className="text-emerald-600" />
              AI Analysis & Recommendations
            </h3>
            <button 
              onClick={generateInsight}
              disabled={loading}
              className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="prose prose-sm prose-emerald max-w-none text-gray-700">
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {aiInsight}
              </div>
            )}
          </div>
        </motion.div>

        {/* Satellite Map */}
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 p-3 pb-2">
            <MapIcon size={18} className="text-emerald-600" />
            <h3 className="font-bold text-gray-900">Farm Satellite Map</h3>
          </div>
          <div className="h-64 bg-gray-200 rounded-xl relative overflow-hidden z-0">
            <MapContainer center={FARM_CENTER} zoom={16} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              <Polygon positions={FARM_POLYGON} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.2 }} />
              <Marker position={FARM_CENTER}>
                <Popup>
                  <div className="text-center">
                    <strong>IoT Farm</strong><br/>
                    Dalat, Vietnam
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorCard({ icon, label, value, status, progress, color }: { icon: React.ReactNode, label: string, value: string | number, status: string, progress: number, color: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{status}</span>
      </div>
      <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900 mb-3">{value}</p>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-auto">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
