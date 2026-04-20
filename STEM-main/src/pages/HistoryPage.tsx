import { useState, useEffect, useMemo } from 'react';
import { Clock, Trash2, Search, Leaf, BarChart3, TrendingUp, AlertTriangle, Calendar, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { HistoryItem } from '../types';
import { t, getLanguage } from '../lib/i18n';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [language] = useState(getLanguage());

  useEffect(() => {
    const data = localStorage.getItem('plantcare_history');
    if (data) {
      try {
        setHistory(JSON.parse(data));
      } catch { /* ignore */ }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm(language === 'vi' ? 'Bạn chắc chắn muốn xóa toàn bộ lịch sử?' : 'Are you sure you want to clear all history?')) {
      localStorage.removeItem('plantcare_history');
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(item =>
    item.result?.diseaseName?.toLowerCase().includes(search.toLowerCase()) ||
    item.plantType?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = useMemo(() => {
    const totalScans = history.length;
    const diseases = history.map(h => h.result?.diseaseName).filter(Boolean);
    const uniqueDiseases = new Set(diseases).size;
    const severeCount = history.filter(h => h.result?.severity?.toLowerCase() === 'severe').length;
    return { totalScans, uniqueDiseases, severeCount };
  }, [history]);

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-violet-50 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
              <Clock className="text-violet-600 dark:text-violet-400" size={18} />
            </div>
            {t('settings.history')}
          </h1>
          {history.length > 0 && (
            <button onClick={clearHistory} className="text-red-500 dark:text-red-400 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
          <input type="text" placeholder={language === 'vi' ? 'Tìm bệnh, cây trồng...' : 'Search diseases, plants...'} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-5">
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2"><BarChart3 size={14} className="text-blue-500" /></div>
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">{stats.totalScans}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{t('home.stats.totalScans')}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-2"><TrendingUp size={14} className="text-emerald-500" /></div>
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">{stats.uniqueDiseases}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{language === 'vi' ? 'Bệnh' : 'Diseases'}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <div className="w-8 h-8 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-2"><AlertTriangle size={14} className="text-red-500" /></div>
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">{stats.severeCount}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{language === 'vi' ? 'Nghiêm trọng' : 'Severe'}</p>
            </div>
          </motion.div>
        )}

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500 space-y-4">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center"><Clock size={36} className="text-gray-300 dark:text-gray-600" /></div>
            <div className="text-center">
              <p className="font-bold text-gray-500 dark:text-gray-400">{language === 'vi' ? 'Chưa có lịch sử' : 'No diagnosis history'}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{language === 'vi' ? 'Quét cây để bắt đầu' : 'Scan a plant to get started'}</p>
            </div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <Search size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p className="font-semibold">{language === 'vi' ? 'Không tìm thấy' : 'No matching results'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredHistory.map((item, index) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: index * 0.03 }} key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex space-x-4 group hover:shadow-md transition-shadow">
                  <img src={item.image} alt="Plant" className="w-20 h-20 object-cover rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2 text-sm">{item.result?.diseaseName || language === 'vi' ? 'Không xác định' : 'Unknown'}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                      <Leaf size={11} />
                      <span>{item.plantType || 'Unknown'}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <Calendar size={11} />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    {item.result?.severity && (
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase",
                        item.result.severity.toLowerCase() === 'mild' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                        item.result.severity.toLowerCase() === 'severe' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      )}>{item.result.severity}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
