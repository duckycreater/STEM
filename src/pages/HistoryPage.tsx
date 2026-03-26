import { useState, useEffect } from 'react';
import { Clock, Trash2, Search, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('plantcare_history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      localStorage.removeItem('plantcare_history');
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(item => 
    item.result?.diseaseName?.toLowerCase().includes(search.toLowerCase()) ||
    item.plantType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="bg-white border-b border-gray-200 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Lịch sử chẩn đoán</h1>
          {history.length > 0 && (
            <button onClick={clearHistory} className="text-red-500 p-2 rounded-full hover:bg-red-50">
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm bệnh, loại cây..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock size={32} className="text-gray-400" />
            </div>
            <p>Chưa có lịch sử chẩn đoán nào</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Không tìm thấy kết quả phù hợp
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.id} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex space-x-4"
              >
                <img 
                  src={item.image} 
                  alt="Plant" 
                  className="w-20 h-20 object-cover rounded-xl bg-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 truncate pr-2">
                      {item.result?.diseaseName || 'Không xác định'}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <Leaf size={12} />
                    <span>{item.plantType || 'Không rõ cây'}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.result?.severity && (
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        item.result.severity.toLowerCase() === 'nhẹ' ? 'bg-yellow-100 text-yellow-800' :
                        item.result.severity.toLowerCase() === 'nặng' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      )}>
                        {item.result.severity}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
