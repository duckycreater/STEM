import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, Activity, Map, Cpu, Zap, CloudRain, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

const SENSOR_DATA = {
  temperature: 28.5,
  humidity: 65,
  soilMoisture: 42,
  ph: 6.2,
  nitrogen: 45,
  phosphorus: 30,
  potassium: 40,
};

export default function DashboardPage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Tôi có dữ liệu cảm biến IoT từ trang trại như sau:
      - Nhiệt độ: ${SENSOR_DATA.temperature}°C
      - Độ ẩm không khí: ${SENSOR_DATA.humidity}%
      - Độ ẩm đất: ${SENSOR_DATA.soilMoisture}%
      - Độ pH đất: ${SENSOR_DATA.ph}
      - N-P-K: ${SENSOR_DATA.nitrogen}-${SENSOR_DATA.phosphorus}-${SENSOR_DATA.potassium} mg/kg
      
      Dựa trên dữ liệu này, hãy đóng vai một kỹ sư nông nghiệp AI siêu việt, đưa ra 3 lời khuyên ngắn gọn, hiện đại và thực tế nhất để tối ưu hóa năng suất cây trồng ngay lúc này. Trả lời bằng tiếng Việt, dùng bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      setAiInsight(response.text || 'Không thể tạo phân tích lúc này.');
    } catch (error) {
      console.error(error);
      setAiInsight('Lỗi kết nối đến hệ thống AI. Vui lòng thử lại sau.');
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
            Trang trại IoT
          </h1>
          <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Map size={14} />
            <span>Đà Lạt, VN</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-3xl font-light">{SENSOR_DATA.temperature}°C</p>
            <p className="text-emerald-100 text-sm flex items-center gap-1">
              <CloudRain size={14} /> Có mưa rào nhẹ
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
            Chỉ số thời gian thực
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <SensorCard 
              icon={<Droplets className="text-blue-500" />} 
              label="Độ ẩm đất" 
              value={`${SENSOR_DATA.soilMoisture}%`} 
              status="Bình thường"
              progress={SENSOR_DATA.soilMoisture}
              color="bg-blue-500"
            />
            <SensorCard 
              icon={<Wind className="text-teal-500" />} 
              label="Độ ẩm K.Khí" 
              value={`${SENSOR_DATA.humidity}%`} 
              status="Hơi cao"
              progress={SENSOR_DATA.humidity}
              color="bg-teal-500"
            />
            <SensorCard 
              icon={<Activity className="text-purple-500" />} 
              label="Độ pH" 
              value={SENSOR_DATA.ph} 
              status="Tối ưu"
              progress={(SENSOR_DATA.ph / 14) * 100}
              color="bg-purple-500"
            />
            <SensorCard 
              icon={<Zap className="text-amber-500" />} 
              label="N-P-K" 
              value={`${SENSOR_DATA.nitrogen}-${SENSOR_DATA.phosphorus}-${SENSOR_DATA.potassium}`} 
              status="Cần bón thêm N"
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
              AI Phân tích & Khuyến nghị
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

        {/* Map Placeholder */}
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          <div className="h-40 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://picsum.photos/seed/farm/800/400")', backgroundSize: 'cover' }}></div>
            <div className="relative z-10 flex flex-col items-center text-gray-600">
              <Map size={32} className="mb-2" />
              <span className="font-medium text-sm">Bản đồ vệ tinh (Đang cập nhật)</span>
            </div>
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
