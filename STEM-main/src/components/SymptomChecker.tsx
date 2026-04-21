// ==========================================
// PlantCare AI — Symptom Checker Component
// ==========================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Leaf, Bug, Droplets, Sun, Thermometer, Wind, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { commonSymptoms, checkSymptomsBySymptoms, offlineDiseases, type Disease } from '../lib/offlineData';
import { t } from '../lib/i18n';

interface SymptomCheckerProps {
  onDiagnosis: (diseases: Disease[]) => void;
  isOffline?: boolean;
}

export function SymptomChecker({ onDiagnosis, isOffline = false }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  // Get list of affected plants
  const plantList = useMemo(() => {
    const plants = new Set<string>();
    offlineDiseases.forEach(d => {
      d.affectedPlants.forEach(p => plants.add(p));
    });
    return Array.from(plants).sort();
  }, []);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
    setShowResults(false);
  };

  const handleCheck = () => {
    if (selectedSymptoms.length === 0) return;

    const results = checkSymptomsBySymptoms(selectedSymptoms, selectedPlant || undefined);
    setShowResults(true);
    onDiagnosis(results);
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setSelectedPlant('');
    setShowResults(false);
  };

  const getSymptomById = (id: string) => commonSymptoms.find(s => s.id === id);

  return (
    <div className="space-y-4">
      {/* Plant Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <Leaf size={16} className="text-emerald-500" />
          {t('home.selectPlant')}
        </label>
        <select
          value={selectedPlant}
          onChange={(e) => {
            setSelectedPlant(e.target.value);
            setShowResults(false);
          }}
          className={cn(
            "w-full px-4 py-3 rounded-xl border-2 transition-all",
            "bg-white dark:bg-gray-800",
            "border-gray-200 dark:border-gray-700",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            "text-gray-900 dark:text-white"
          )}
        >
          <option value="">Tất cả cây trồng</option>
          {plantList.map(plant => (
            <option key={plant} value={plant}>{plant}</option>
          ))}
        </select>
      </div>

      {/* Symptom Grid */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <Bug size={16} className="text-amber-500" />
          Chọn triệu chứng (chọn nhiều)
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {commonSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                <span className="text-xl">{symptom.icon}</span>
                <span className="text-sm font-medium line-clamp-2">{symptom.nameVi}</span>
                {isSelected && (
                  <Check size={16} className="ml-auto text-emerald-500" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Symptoms Summary */}
      {selectedSymptoms.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Đã chọn: {selectedSymptoms.length} triệu chứng
            </span>
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <X size={12} /> Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedSymptoms.map(id => {
              const symptom = getSymptomById(id);
              return symptom && (
                <span
                  key={id}
                  className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs flex items-center gap-1"
                >
                  {symptom.icon} {symptom.nameVi}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Check Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleCheck}
        disabled={selectedSymptoms.length === 0}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2",
          selectedSymptoms.length > 0
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
            : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
        )}
      >
        <Search size={20} />
        Phân tích triệu chứng
        {selectedSymptoms.length > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
            {selectedSymptoms.length}
          </span>
        )}
      </motion.button>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <ResultsPanel diseases={checkSymptomsBySymptoms(selectedSymptoms, selectedPlant || undefined)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// Results Panel
// ==========================================

interface ResultsPanelProps {
  diseases: Disease[];
}

function ResultsPanel({ diseases }: ResultsPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔥 Nguy hiểm';
      case 'high': return '⚠️ Nghiêm trọng';
      case 'medium': return '⚡ Trung bình';
      case 'low': return '✅ Nhẹ';
      default: return '❓ Không rõ';
    }
  };

  if (diseases.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <Search size={48} className="mx-auto mb-3 opacity-50" />
        <p>Không tìm thấy bệnh phù hợp với triệu chứng đã chọn.</p>
        <p className="text-sm mt-1">Thử chọn thêm triệu chứng hoặc thay đổi loại cây.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <Check size={20} className="text-emerald-500" />
        <span className="font-bold text-gray-900 dark:text-white">
          Tìm thấy {diseases.length} bệnh phù hợp:
        </span>
      </div>

      {diseases.map((disease, index) => (
        <motion.div
          key={disease.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === disease.id ? null : disease.id)}
            className="w-full p-4 flex items-start gap-3 text-left"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold",
              index === 0 ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            )}>
              #{index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                  {disease.nameVi}
                </h4>
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getSeverityColor(disease.severity))}>
                  {getSeverityLabel(disease.severity)}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                {disease.symptomsVi}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {disease.affectedPlants.slice(0, 3).map(plant => (
                  <span key={plant} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded text-xs">
                    🌱 {plant}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight
              size={20}
              className={cn(
                "text-gray-400 transition-transform",
                expanded === disease.id && "rotate-90"
              )}
            />
          </button>

          <AnimatePresence>
            {expanded === disease.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-3">
                  {/* Symptoms */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      🔍 Triệu chứng:
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {disease.symptomsVi}
                    </p>
                  </div>

                  {/* Treatment */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      💊 Cách điều trị:
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {disease.treatmentVi}
                    </p>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      🛡️ Phòng ngừa:
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {disease.preventionVi}
                    </p>
                  </div>

                  {/* Causes */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      ⚠️ Nguyên nhân:
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {disease.causesVi}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SymptomChecker;
