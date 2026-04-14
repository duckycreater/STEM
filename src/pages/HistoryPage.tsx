import { useState, useEffect } from 'react';
import { Clock, Trash2, Search, Leaf, MapPin, GitCompare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('plantcare_history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('plantcare_history');
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(item => 
    item.result?.diseaseName?.toLowerCase().includes(search.toLowerCase()) ||
    item.plantType?.toLowerCase().includes(search.toLowerCase()) ||
    item.batchName?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCompareSelection = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(prev => prev.filter(item => item !== id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare(prev => [...prev, id]);
      } else {
        alert('Chỉ có thể so sánh tối đa 2 mục.');
      }
    }
  };

  const handleCompareClick = () => {
    if (selectedForCompare.length === 2) {
      setShowCompareModal(true);
    } else {
      alert('Vui lòng chọn đúng 2 mục để so sánh.');
    }
  };

  const cancelCompare = () => {
    setIsComparing(false);
    setSelectedForCompare([]);
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="bg-white border-b border-gray-200 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Lịch sử chẩn đoán</h1>
          <div className="flex items-center gap-2">
            {history.length > 1 && !isComparing && (
              <button onClick={() => setIsComparing(true)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                <GitCompare size={16} /> So sánh
              </button>
            )}
            {isComparing && (
              <button onClick={cancelCompare} className="text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                Hủy
              </button>
            )}
            {history.length > 0 && !isComparing && (
              <button onClick={clearHistory} className="text-red-500 p-2 rounded-full hover:bg-red-50">
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm bệnh, cây, lô..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
        </div>
        
        {isComparing && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-100">
            <span className="text-sm text-blue-800 font-medium">
              Đã chọn {selectedForCompare.length}/2 mục
            </span>
            <button 
              onClick={handleCompareClick}
              disabled={selectedForCompare.length !== 2}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              So sánh ngay
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock size={32} className="text-gray-400" />
            </div>
            <p>No diagnosis history yet</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No matching results found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const isSelected = selectedForCompare.includes(item.id);
              return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.id} 
                onClick={() => isComparing && toggleCompareSelection(item.id)}
                className={cn(
                  "bg-white rounded-2xl p-4 shadow-sm border flex space-x-4 transition-all",
                  isComparing ? "cursor-pointer hover:border-blue-300" : "border-gray-100",
                  isSelected ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50/30" : ""
                )}
              >
                <div className="relative shrink-0">
                  <img 
                    src={item.image} 
                    alt="Plant" 
                    className="w-20 h-20 object-cover rounded-xl bg-gray-100"
                  />
                  {isComparing && (
                    <div className={cn(
                      "absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold transition-colors",
                      isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-transparent"
                    )}>
                      {isSelected && selectedForCompare.indexOf(item.id) + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 truncate pr-2">
                      {item.result?.diseaseName || 'Không xác định'}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-gray-500 mb-2">
                    <div className="flex items-center space-x-2">
                      <Leaf size={12} />
                      <span>{item.plantType || 'Cây chưa xác định'}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    {item.batchName && (
                      <div className="flex items-center space-x-1.5 text-emerald-600 font-medium">
                        <MapPin size={12} />
                        <span>{item.batchName}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.result?.severity && (
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        item.result.severity.toLowerCase().includes('nặng') || item.result.severity.toLowerCase().includes('cao') ? 'bg-red-100 text-red-800' :
                        item.result.severity.toLowerCase().includes('nhẹ') || item.result.severity.toLowerCase().includes('khỏe') ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      )}>
                        {item.result.severity}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between p-4 text-white border-b border-white/10">
              <h2 className="text-lg font-bold">So sánh chẩn đoán</h2>
              <button onClick={() => setShowCompareModal(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {selectedForCompare.map(id => {
                  const item = history.find(h => h.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl overflow-hidden flex flex-col">
                      <img src={item.image} alt="Plant" className="w-full h-40 object-cover bg-gray-100" />
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="text-xs text-gray-500 mb-1">{new Date(item.date).toLocaleDateString()}</div>
                        <h3 className="font-bold text-gray-900 mb-2 leading-tight">{item.result?.diseaseName}</h3>
                        
                        <div className="space-y-3 mt-2 flex-1">
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase">Mức độ</div>
                            <div className="text-sm font-bold mt-0.5">{item.result?.severity}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase">Lô / Vị trí</div>
                            <div className="text-sm font-medium text-emerald-600 mt-0.5">{item.batchName || 'Chưa phân loại'}</div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 uppercase">Hành động</div>
                            <div className="text-sm text-gray-800 mt-0.5 line-clamp-3">{item.result?.actionAdvice || item.result?.treatment}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
