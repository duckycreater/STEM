// ==========================================
// PlantCare AI — Plant Care Calendar Component
// ==========================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Leaf, Droplets, Bug, Scissors, Package, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { careCalendar, plantEncyclopedia } from '../lib/offlineData';
import { t } from '../lib/i18n';

interface CareCalendarProps {
  plantFilter?: string;
}

const MONTHS_VI = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const MONTHS_SHORT_VI = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

export function CareCalendar({ plantFilter }: CareCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedPlant, setSelectedPlant] = useState<string>(plantFilter || '');

  // Get unique plants in calendar
  const plants = useMemo(() => {
    const plantList = new Set(careCalendar.map(task => task.plant));
    return Array.from(plantList);
  }, []);

  // Filter and group tasks by plant
  const tasksByPlant = useMemo(() => {
    const filtered = careCalendar.filter(task => {
      const matchesMonth = task.month === selectedMonth;
      const matchesPlant = !selectedPlant || task.plant === selectedPlant;
      return matchesMonth && matchesPlant;
    });

    const grouped: Record<string, typeof filtered> = {};
    filtered.forEach(task => {
      if (!grouped[task.plant]) {
        grouped[task.plant] = [];
      }
      grouped[task.plant].push(task);
    });
    return grouped;
  }, [selectedMonth, selectedPlant]);

  const getPlantName = (plantId: string) => {
    const plant = plantEncyclopedia.find(p => p.id === plantId);
    return plant?.nameVi || plantId;
  };

  const getPlantEmoji = (plantId: string) => {
    const plant = plantEncyclopedia.find(p => p.id === plantId);
    switch (plant?.category) {
      case 'Cereal': return '🌾';
      case 'Vegetable': return '🥬';
      case 'Root/Tuber': return '🥔';
      case 'Fruit': return '🍎';
      case 'Tropical Fruit': return '🥭';
      case 'Citrus Fruit': return '🍊';
      default: return '🌱';
    }
  };

  const getTaskIcon = (task: string) => {
    const lowerTask = task.toLowerCase();
    if (lowerTask.includes('water') || lowerTask.includes('tưới')) return <Droplets size={16} className="text-blue-500" />;
    if (lowerTask.includes('prun') || lowerTask.includes('tỉa')) return <Scissors size={16} className="text-purple-500" />;
    if (lowerTask.includes('pest') || lowerTask.includes('sâu')) return <Bug size={16} className="text-red-500" />;
    if (lowerTask.includes('fertil') || lowerTask.includes('bón')) return <Package size={16} className="text-green-500" />;
    if (lowerTask.includes('harvest') || lowerTask.includes('thu hoạch')) return <Leaf size={16} className="text-emerald-500" />;
    if (lowerTask.includes('monitor') || lowerTask.includes('theo dõi')) return <AlertTriangle size={16} className="text-amber-500" />;
    return <CalendarIcon size={16} className="text-gray-500" />;
  };

  const prevMonth = () => {
    setSelectedMonth(prev => prev === 1 ? 12 : prev - 1);
  };

  const nextMonth = () => {
    setSelectedMonth(prev => prev === 12 ? 1 : prev + 1);
  };

  const currentMonth = new Date().getMonth() + 1;
  const isCurrentMonth = selectedMonth === currentMonth;

  return (
    <div className="space-y-4">
      {/* Month Selector */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="text-center">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
            {MONTHS_VI[selectedMonth - 1]}
          </h3>
          {isCurrentMonth && (
            <span className="text-xs text-emerald-600 font-medium">Hiện tại</span>
          )}
        </div>

        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Plant Filter */}
      <select
        value={selectedPlant}
        onChange={(e) => setSelectedPlant(e.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-xl border-2 transition-all",
          "bg-white dark:bg-gray-800",
          "border-gray-200 dark:border-gray-700",
          "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
          "text-gray-900 dark:text-white"
        )}
      >
        <option value="">Tất cả cây trồng</option>
        {plants.map(plant => (
          <option key={plant} value={plant}>
            {getPlantEmoji(plant)} {getPlantName(plant)}
          </option>
        ))}
      </select>

      {/* Calendar Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {MONTHS_SHORT_VI.map((month, index) => {
          const monthNum = index + 1;
          const hasTasks = careCalendar.some(t => t.month === monthNum && (!selectedPlant || t.plant === selectedPlant));
          
          return (
            <button
              key={month}
              onClick={() => setSelectedMonth(monthNum)}
              className={cn(
                "py-2 px-3 rounded-xl text-sm font-medium transition-all",
                selectedMonth === monthNum
                  ? "bg-emerald-600 text-white shadow-lg"
                  : hasTasks
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {month}
              {hasTasks && (
                <span className={cn(
                  "ml-1 text-xs",
                  selectedMonth === monthNum ? "text-white/70" : "text-emerald-500"
                )}>
                  •
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CalendarIcon size={18} className="text-emerald-500" />
          Công việc trong tháng
        </h4>

        {Object.keys(tasksByPlant).length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <CalendarIcon size={48} className="mx-auto mb-3 opacity-50" />
            <p>Không có công việc nào cho tháng này.</p>
          </div>
        ) : (
          Object.entries(tasksByPlant).map(([plantId, tasks]) => (
            <div key={plantId} className="space-y-2">
              {/* Plant Header */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                <span className="text-xl">{getPlantEmoji(plantId)}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {getPlantName(plantId)}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  {tasks.length} công việc
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-1">
                <AnimatePresence>
                  {tasks.map((task, index) => (
                    <motion.div
                      key={`${plantId}-${task.task}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {getTaskIcon(task.task)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {task.taskVi}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
        <h4 className="font-bold mb-2 flex items-center gap-2">
          💡 Mẹo chăm sóc tháng này
        </h4>
        <ul className="text-sm space-y-1 opacity-90">
          {selectedMonth >= 3 && selectedMonth <= 5 && (
            <li>🌱 Tháng này là thời điểm tốt để trồng nhiều loại rau và cây ăn quả.</li>
          )}
          {selectedMonth >= 6 && selectedMonth <= 8 && (
            <li>☀️ Cần tưới nước thường xuyên hơn trong mùa nắng nóng.</li>
          )}
          {selectedMonth >= 9 && selectedMonth <= 11 && (
            <li>🍂 Chuẩn bị thu hoạch và dọn dẹp vườn cho vụ mới.</li>
          )}
          {selectedMonth === 12 || selectedMonth <= 2 && (
            <li>❄️ Chú ý bảo vệ cây khỏi sương giá và thời tiết lạnh.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CareCalendar;
