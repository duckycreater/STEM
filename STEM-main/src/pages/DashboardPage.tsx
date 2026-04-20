import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, Activity, Map as MapIcon, Cpu, Zap, CloudRain, RefreshCw, TrendingUp, Wifi, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ReactMarkdown from 'react-markdown';
import { t, getLanguage, type Language } from '../lib/i18n';
import { useOnlineStatus } from '../hooks/useCustom';

// Fix Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FARM_CENTER: [number, number] = [11.9404, 108.4583];
const FARM_POLYGON: [number, number][] = [
  [11.9410, 108.4578],
  [11.9410, 108.4588],
  [11.9398, 108.4588],
  [11.9398, 108.4578],
];

function GaugeRing({ value, max, color, size = 64 }: { value: number; max: number; color: string; size?: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * (size / 2 - 4);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill="none" stroke="currentColor" strokeWidth={3} className="text-gray-100 dark:text-gray-800" />
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill="none" stroke={color} strokeWidth={3} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
    </svg>
  );
}

export default function DashboardPage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sensorAnim, setSensorAnim] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 42,
    ph: 6.2,
    nitrogen: 45,
    phosphorus: 30,
    potassium: 40,
  });
  const [language] = useState<Language>(getLanguage());
  const isOnline = useOnlineStatus();

  useEffect(() => {
    setTimeout(() => setSensorAnim(true), 300);
    // Fetch latest sensor data
    fetch('/api/sensors')
      .then(r => r.json())
      .then(data => {
        if (data.success) setSensorData(data.data);
      })
      .catch(console.error);
  }, []);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sensors/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sensorData),
      });
      const data = await response.json();

      if (data.success) {
        setAiInsight(data.data.insight);
      } else {
        setAiInsight(language === 'vi' ? 'Không thể phân tích dữ liệu.' : 'Cannot analyze data.');
      }
    } catch (error) {
      console.error(error);
      setAiInsight(language === 'vi' ? 'Lỗi kết nối. Vui lòng thử lại.' : 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/sensors')
        .then(r => r.json())
        .then(data => {
          if (data.success) setSensorData(data.data);
        })
        .catch(console.error);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      {/* Premium Header */}
      <header className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:from-emerald-800 dark:via-teal-900 dark:to-cyan-950 text-white p-5 pt-safe-top sticky top-0 z-10 shadow-xl overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-300/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-extrabold flex items-center gap-2">
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Cpu size={18} />
              </div>
              {t('dashboard.iotFarm')}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <MapIcon size={12} />
                <span className="font-semibold">Dalat, VN</span>
              </div>
              <div className={cn(
                "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl backdrop-blur-sm border",
                isOnline
                  ? "bg-emerald-500/30 border-emerald-400/20 text-emerald-200"
                  : "bg-red-500/30 border-red-400/20 text-red-200"
              )}>
                <Wifi size={12} />
                <span className="font-semibold">{isOnline ? t('common.online') : t('common.offline')}</span>
              </div>
            </div>
          </div>

          {/* Weather widget in header */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-4xl font-light tracking-tight">{sensorData.temperature}°C</p>
              <p className="text-emerald-100/70 text-sm flex items-center gap-1.5 mt-1">
                <CloudRain size={14} />
                {language === 'vi' ? 'Mưa nhẹ • Độ ẩm' : 'Light rain • Humidity'} {sensorData.humidity}%
              </p>
            </div>
            <div className="text-right">
              <Sun size={52} className="text-yellow-300/80 animate-float" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-5">
        {/* Sensor Grid */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity size={14} />
            {t('dashboard.realTimeMetrics')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <SensorCard
              icon={<Droplets className="text-blue-500" />}
              label={t('dashboard.soilMoisture')}
              value={`${sensorData.soilMoisture}%`}
              status="Normal"
              statusColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
              progress={sensorData.soilMoisture}
              gaugeColor="#3b82f6"
              delay={0}
              animate={sensorAnim}
            />
            <SensorCard
              icon={<Wind className="text-teal-500" />}
              label={t('dashboard.airHumidity')}
              value={`${sensorData.humidity}%`}
              status="Slightly High"
              statusColor="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30"
              progress={sensorData.humidity}
              gaugeColor="#14b8a6"
              delay={0.1}
              animate={sensorAnim}
            />
            <SensorCard
              icon={<Activity className="text-purple-500" />}
              label={t('dashboard.phLevel')}
              value={sensorData.ph}
              status="Optimal"
              statusColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
              progress={(sensorData.ph / 14) * 100}
              gaugeColor="#a855f7"
              delay={0.2}
              animate={sensorAnim}
            />
            <SensorCard
              icon={<Zap className="text-amber-500" />}
              label={t('dashboard.npk')}
              value={`${sensorData.nitrogen}-${sensorData.phosphorus}-${sensorData.potassium}`}
              status="Needs N"
              statusColor="text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30"
              progress={60}
              gaugeColor="#f59e0b"
              delay={0.3}
              animate={sensorAnim}
            />
          </div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <Cpu size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              {t('dashboard.aiAnalysis')}
            </h3>
            <button
              onClick={generateInsight}
              disabled={loading}
              className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 p-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="text-gray-700 dark:text-gray-300">
            {loading ? (
              <div className="space-y-2.5">
                <div className="h-4 skeleton rounded-lg w-3/4" />
                <div className="h-4 skeleton rounded-lg w-full" />
                <div className="h-4 skeleton rounded-lg w-5/6" />
                <div className="h-4 skeleton rounded-lg w-2/3" />
              </div>
            ) : (
              <div className="prose prose-sm prose-emerald dark:prose-invert max-w-none text-sm leading-relaxed">
                <ReactMarkdown>{aiInsight || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>

        {/* Satellite Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <MapIcon size={14} className="text-blue-600 dark:text-blue-400" />
              </div>
              {t('dashboard.farmMap')}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
              {isOnline ? t('dashboard.live') : t('common.offline')}
            </span>
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 relative overflow-hidden z-0 mx-3 mb-3 rounded-xl">
            <MapContainer center={FARM_CENTER} zoom={16} scrollWheelZoom={false} className="w-full h-full rounded-xl">
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              <Polygon positions={FARM_POLYGON} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.2 }} />
              <Marker position={FARM_CENTER}>
                <Popup>
                  <div className="text-center">
                    <strong>IoT Farm</strong><br />
                    Dalat, Vietnam
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SensorCard({ icon, label, value, status, statusColor, progress, gaugeColor, delay, animate }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  status: string;
  statusColor: string;
  progress: number;
  gaugeColor: string;
  delay: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">{icon}</div>
        <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${statusColor}`}>{status}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-[11px] font-semibold mb-0.5">{label}</p>
      <p className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">{value}</p>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mt-auto overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={animate ? { width: `${progress}%` } : {}} transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }} className="h-1.5 rounded-full" style={{ backgroundColor: gaugeColor }} />
      </div>
    </motion.div>
  );
}

import { cn } from '../lib/utils';
