import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, Sparkles, BarChart3, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { t, getLanguage, type Language } from '../lib/i18n';

const PRODUCTS = [
  { key: 'coffee', name: 'Cà phê', emoji: '☕' },
  { key: 'rice', name: 'Gạo', emoji: '🌾' },
  { key: 'pepper', name: 'Tiêu', emoji: '🌶️' },
  { key: 'durian', name: 'Sầu riêng', emoji: '🍈' },
];

const MARKET_DATA: Record<string, Array<{ month: string; price: number }>> = {
  coffee: [
    { month: 'Oct', price: 65000 },
    { month: 'Nov', price: 68000 },
    { month: 'Dec', price: 72000 },
    { month: 'Jan', price: 75000 },
    { month: 'Feb', price: 82000 },
    { month: 'Mar', price: 85000 },
  ],
  rice: [
    { month: 'Oct', price: 8500 },
    { month: 'Nov', price: 8700 },
    { month: 'Dec', price: 8900 },
    { month: 'Jan', price: 9200 },
    { month: 'Feb', price: 9100 },
    { month: 'Mar', price: 9500 },
  ],
  pepper: [
    { month: 'Oct', price: 70000 },
    { month: 'Nov', price: 72000 },
    { month: 'Dec', price: 75000 },
    { month: 'Jan', price: 80000 },
    { month: 'Feb', price: 85000 },
    { month: 'Mar', price: 92000 },
  ],
  durian: [
    { month: 'Oct', price: 80000 },
    { month: 'Nov', price: 95000 },
    { month: 'Dec', price: 110000 },
    { month: 'Jan', price: 120000 },
    { month: 'Feb', price: 105000 },
    { month: 'Mar', price: 130000 },
  ]
};

export default function MarketPage() {
  const [selectedProduct, setSelectedProduct] = useState('coffee');
  const [aiForecast, setAiForecast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [language] = useState<Language>(getLanguage());

  const generateForecast = async () => {
    setLoading(true);
    try {
      const prompt = language === 'vi'
        ? `Dữ liệu giá ${PRODUCTS.find(p => p.key === selectedProduct)?.name} 6 tháng qua: ${MARKET_DATA[selectedProduct].map(d => `${d.month}: ${d.price.toLocaleString()} VNĐ`).join(', ')}. Dự báo xu hướng giá tháng tới và khuyến nghị cho nông dân (bán hay giữ). Trả lời ngắn gọn bằng tiếng Việt.`
        : `Here is the price data for ${selectedProduct} over the last 6 months: ${MARKET_DATA[selectedProduct].map(d => `${d.month}: ${d.price.toLocaleString()} VND`).join(', ')}. Provide a concise forecast for next month and advice for farmers. Reply in English.`;

      const response = await fetch('/api/market/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct, data: MARKET_DATA[selectedProduct], prompt }),
      });

      const data = await response.json();
      if (data.success) {
        setAiForecast(data.data.forecast);
      } else {
        setAiForecast(language === 'vi' ? 'Không thể tạo dự báo.' : 'Cannot generate forecast.');
      }
    } catch (error) {
      console.error(error);
      setAiForecast(language === 'vi' ? 'Lỗi kết nối.' : 'Connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateForecast();
  }, [selectedProduct]);

  const currentData = MARKET_DATA[selectedProduct];
  const currentPrice = currentData[currentData.length - 1].price;
  const previousPrice = currentData[currentData.length - 2].price;
  const percentChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isUp = percentChange >= 0;
  const firstPrice = currentData[0].price;
  const totalChange = ((currentPrice - firstPrice) / firstPrice) * 100;

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <DollarSign className="text-emerald-600 dark:text-emerald-400" size={18} />
            </div>
            {t('market.title')}
          </h1>
          <div className={cn("flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold", isUp ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400")}>
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(totalChange).toFixed(1)}% / 6mo
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {PRODUCTS.map(product => (
            <button key={product.key} onClick={() => setSelectedProduct(product.key)} className={cn("flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all", selectedProduct === product.key ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700")}>
              <span>{product.emoji}</span>
              {product.name}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-5">
        {/* Price Overview */}
        <motion.div key={selectedProduct} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1.5 uppercase tracking-wider">{t('market.price')}</p>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{currentPrice.toLocaleString()} <span className="text-base text-gray-400 dark:text-gray-500 font-medium">VND/kg</span></h2>
            </div>
            <div className={cn("flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold", isUp ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400")}>
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(percentChange).toFixed(1)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">High</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">{Math.max(...currentData.map(d => d.price)).toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">Low</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">{Math.min(...currentData.map(d => d.price)).toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">Avg</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">{Math.round(currentData.reduce((a, b) => a + b.price, 0) / currentData.length).toLocaleString()}</p>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', fontSize: '12px', fontWeight: 600, background: 'white' }} formatter={(value: number) => [`${value.toLocaleString()} VND`, 'Price']} />
                <Area type="monotone" dataKey="price" stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" dot={{ fill: isUp ? "#10b981" : "#ef4444", strokeWidth: 0, r: 3 }} activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Forecast */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-3xl p-6 shadow-sm border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-indigo-200 dark:text-indigo-800 opacity-30"><Sparkles size={100} /></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center"><Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" /></div>
                AI Trend Forecast
              </h3>
              <button onClick={generateForecast} disabled={loading} className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 p-2 rounded-xl transition-colors disabled:opacity-50">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            <div className="text-indigo-900/80 dark:text-indigo-200/80">
              {loading ? (
                <div className="space-y-2.5">
                  <div className="h-4 skeleton rounded-lg w-full" style={{ background: 'rgba(99,102,241,0.1)' }} />
                  <div className="h-4 skeleton rounded-lg w-5/6" style={{ background: 'rgba(99,102,241,0.1)' }} />
                  <div className="h-4 skeleton rounded-lg w-4/5" style={{ background: 'rgba(99,102,241,0.1)' }} />
                </div>
              ) : (
                <div className="prose prose-sm prose-indigo dark:prose-invert max-w-none text-sm leading-relaxed font-medium">
                  <ReactMarkdown>{aiForecast || ''}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
