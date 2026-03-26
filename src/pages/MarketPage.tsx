import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GoogleGenAI } from '@google/genai';

const MARKET_DATA = {
  'Cà phê': [
    { month: 'T10', price: 65000 },
    { month: 'T11', price: 68000 },
    { month: 'T12', price: 72000 },
    { month: 'T1', price: 75000 },
    { month: 'T2', price: 82000 },
    { month: 'T3', price: 85000 },
  ],
  'Lúa gạo': [
    { month: 'T10', price: 8500 },
    { month: 'T11', price: 8700 },
    { month: 'T12', price: 8900 },
    { month: 'T1', price: 9200 },
    { month: 'T2', price: 9100 },
    { month: 'T3', price: 9500 },
  ],
  'Hồ tiêu': [
    { month: 'T10', price: 70000 },
    { month: 'T11', price: 72000 },
    { month: 'T12', price: 75000 },
    { month: 'T1', price: 80000 },
    { month: 'T2', price: 85000 },
    { month: 'T3', price: 92000 },
  ]
};

export default function MarketPage() {
  const [selectedProduct, setSelectedProduct] = useState('Cà phê');
  const [aiForecast, setAiForecast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateForecast = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const dataStr = MARKET_DATA[selectedProduct as keyof typeof MARKET_DATA]
        .map(d => `${d.month}: ${d.price.toLocaleString()} VNĐ`)
        .join(', ');
        
      const prompt = `Dưới đây là dữ liệu giá ${selectedProduct} trong 6 tháng qua: ${dataStr}. 
      Đóng vai một chuyên gia phân tích thị trường nông sản AI, hãy đưa ra dự báo ngắn gọn (khoảng 3-4 câu) về xu hướng giá trong tháng tới và lời khuyên cho nông dân (có nên bán ngay hay trữ lại). Trả lời bằng tiếng Việt, dùng bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      setAiForecast(response.text || 'Không thể tạo dự báo lúc này.');
    } catch (error) {
      console.error(error);
      setAiForecast('Lỗi kết nối đến hệ thống AI. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateForecast();
  }, [selectedProduct]);

  const currentData = MARKET_DATA[selectedProduct as keyof typeof MARKET_DATA];
  const currentPrice = currentData[currentData.length - 1].price;
  const previousPrice = currentData[currentData.length - 2].price;
  const percentChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isUp = percentChange >= 0;

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 pt-safe-top sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="text-emerald-600" />
          Thị trường Nông sản
        </h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Object.keys(MARKET_DATA).map(product => (
            <button
              key={product}
              onClick={() => setSelectedProduct(product)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedProduct === product 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {product}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-6">
        {/* Price Overview Card */}
        <motion.div 
          key={selectedProduct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Giá thu mua hiện tại</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentPrice.toLocaleString()} <span className="text-lg text-gray-500 font-normal">VNĐ/kg</span>
              </h2>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${
              isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(percentChange).toFixed(1)}%</span>
            </div>
          </div>

          <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value.toLocaleString()} VNĐ`, 'Giá']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isUp ? "#10b981" : "#ef4444"} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Forecast Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-sm border border-indigo-100 relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 text-indigo-200 opacity-50">
            <Sparkles size={100} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-600" />
                AI Dự báo xu hướng
              </h3>
              <button 
                onClick={generateForecast}
                disabled={loading}
                className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            
            <div className="prose prose-sm prose-indigo max-w-none text-indigo-900/80">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-indigo-200/50 rounded w-full"></div>
                  <div className="h-4 bg-indigo-200/50 rounded w-5/6"></div>
                  <div className="h-4 bg-indigo-200/50 rounded w-4/5"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                  {aiForecast}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
