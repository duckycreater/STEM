import { useState, useMemo } from 'react';
import { BookOpen, Search, Leaf, ChevronDown, ChevronUp, AlertTriangle, Pill, Filter, Grid, List, Stethoscope, Calendar, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { offlineDiseases, findMatchingDiseases, databaseStats } from '../lib/offlineData';
import { t, getLanguage } from '../lib/i18n';
import { SymptomChecker } from '../components/SymptomChecker';
import { PlantEncyclopedia } from '../components/PlantEncyclopedia';
import CareCalendar from '../components/PlantCareCalendar';
import type { Disease } from '../lib/offlineData';

type TabType = 'diseases' | 'symptoms' | 'plants' | 'calendar';
type ViewMode = 'grid' | 'list';

const SEVERITY_FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'critical', label: 'Nguy hiểm', color: 'text-red-500' },
  { value: 'high', label: 'Nặng', color: 'text-orange-500' },
  { value: 'medium', label: 'Vừa', color: 'text-yellow-500' },
  { value: 'low', label: 'Nhẹ', color: 'text-green-500' },
];

const CATEGORY_FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'fungal', label: '🍄 Nấm' },
  { value: 'bacterial', label: '🦠 Vi khuẩn' },
  { value: 'viral', label: '🦠 Virus' },
  { value: 'pest', label: '🐛 Sâu hại' },
  { value: 'deficiency', label: '💚 Thiếu dinh dưỡng' },
  { value: 'environmental', label: '🌡️ Môi trường' },
];

export default function PlantsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('diseases');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [language] = useState(getLanguage());

  // Search offline diseases
  const filteredDiseases = useMemo(() => {
    let results: Disease[] = [];
    
    if (search.trim()) {
      results = findMatchingDiseases(search, undefined, language as 'vi' | 'en');
    } else {
      results = offlineDiseases;
    }

    // Apply severity filter
    if (severityFilter !== 'all') {
      results = results.filter(d => d.severity === severityFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(d => d.category === categoryFilter);
    }

    return results;
  }, [search, severityFilter, categoryFilter, language]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig: Record<string, { bg: string; text: string; label: string }> = {
      critical: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', label: '🔥 Nguy hiểm' },
      high: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', label: '⚠️ Nặng' },
      medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', label: '⚡ Vừa' },
      low: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', label: '✅ Nhẹ' },
    };
    const config = severityConfig[severity] || severityConfig.low;
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", config.bg, config.text)}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig: Record<string, { bg: string; text: string }> = {
      fungal: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
      bacterial: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      viral: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' },
      pest: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
      deficiency: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400' },
      environmental: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400' },
    };
    const config = categoryConfig[category] || categoryConfig.environmental;
    return (
      <span className={cn("px-2 py-0.5 rounded-lg text-xs font-medium", config.bg, config.text)}>
        {category}
      </span>
    );
  };

  const handleSymptomDiagnosis = (diseases: Disease[]) => {
    setSearch('');
    setExpandedId(diseases[0]?.id || null);
  };

  const tabs = [
    { id: 'diseases' as TabType, label: 'Bệnh cây', icon: BookOpen, badge: databaseStats.totalDiseases },
    { id: 'symptoms' as TabType, label: 'Triệu chứng', icon: Stethoscope },
    { id: 'plants' as TabType, label: 'Cây trồng', icon: Heart, badge: databaseStats.totalPlants },
    { id: 'calendar' as TabType, label: 'Lịch chăm', icon: Calendar },
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <BookOpen className="text-emerald-600 dark:text-emerald-400" size={18} />
            </div>
            {language === 'vi' ? 'Từ điển Nông nghiệp' : 'Agriculture Dictionary'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                  isActive
                    ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <Icon size={14} />
                {tab.label}
                {tab.badge && (
                  <span className={cn(
                    "ml-1 px-1.5 py-0.5 rounded-full text-[10px]",
                    isActive ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 dark:bg-gray-600"
                  )}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Diseases Tab */}
        {activeTab === 'diseases' && (
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm bệnh cây..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all",
                  "bg-white dark:bg-gray-800",
                  "border-gray-200 dark:border-gray-700",
                  "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                  "text-gray-900 dark:text-white placeholder:text-gray-400"
                )}
              />
            </div>

            {/* Filters */}
            <div className="space-y-2">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {CATEGORY_FILTERS.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setCategoryFilter(filter.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                      categoryFilter === filter.value
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Severity Filter */}
              <div className="flex gap-2">
                {SEVERITY_FILTERS.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setSeverityFilter(filter.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      severityFilter === filter.value
                        ? filter.value === 'all'
                          ? "bg-emerald-600 text-white"
                          : filter.color
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tìm thấy {filteredDiseases.length} bệnh
              </p>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'list' ? "bg-white dark:bg-gray-700 text-emerald-600" : "text-gray-400"
                  )}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'grid' ? "bg-white dark:bg-gray-700 text-emerald-600" : "text-gray-400"
                  )}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>

            {/* Disease List */}
            <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-3" : "space-y-3"}>
              {filteredDiseases.map((disease, index) => (
                <motion.div
                  key={disease.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={cn(
                    "bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden",
                    viewMode === 'grid' ? "shadow-sm" : "shadow-sm hover:shadow-md transition-shadow"
                  )}
                >
                  <button
                    onClick={() => toggleExpand(disease.id)}
                    className={cn(
                      "w-full text-left",
                      viewMode === 'grid' ? "p-3" : "p-4"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        disease.category === 'fungal' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' :
                        disease.category === 'bacterial' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' :
                        disease.category === 'viral' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-500' :
                        disease.category === 'pest' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500' :
                        disease.category === 'deficiency' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-500' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      )}>
                        {disease.category === 'fungal' ? '🍄' :
                         disease.category === 'bacterial' ? '🦠' :
                         disease.category === 'viral' ? '🦠' :
                         disease.category === 'pest' ? '🐛' :
                         disease.category === 'deficiency' ? '💚' :
                         '🌡️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">
                            {disease.nameVi}
                          </h3>
                          {getSeverityBadge(disease.severity)}
                        </div>
                        {viewMode === 'list' && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {disease.symptomsVi}
                          </p>
                        )}
                        {viewMode === 'grid' && (
                          <div className="flex items-center gap-1 mt-1">
                            {getCategoryBadge(disease.category)}
                          </div>
                        )}
                      </div>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "shrink-0 text-gray-400 transition-transform mt-1",
                          expandedId === disease.id && "rotate-180"
                        )}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === disease.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={cn(
                          "border-t border-gray-100 dark:border-gray-800",
                          viewMode === 'grid' ? "p-3" : "px-4 pb-4 pt-3"
                        )}>
                          {/* Affected Plants */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {disease.affectedPlants.slice(0, 4).map(plant => (
                              <span key={plant} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded text-xs">
                                🌱 {plant}
                              </span>
                            ))}
                          </div>

                          {/* Symptoms */}
                          <div className="mb-3">
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">🔍 Triệu chứng</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {disease.symptomsVi}
                            </p>
                          </div>

                          {/* Treatment */}
                          <div className="mb-3">
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">💊 Cách điều trị</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {disease.treatmentVi}
                            </p>
                          </div>

                          {/* Prevention */}
                          <div>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">🛡️ Phòng ngừa</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {disease.preventionVi}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredDiseases.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Search size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium">Không tìm thấy bệnh phù hợp</p>
                <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        )}

        {/* Symptom Checker Tab */}
        {activeTab === 'symptoms' && (
          <div className="p-4">
            <SymptomChecker onDiagnosis={handleSymptomDiagnosis} />
          </div>
        )}

        {/* Plant Encyclopedia Tab */}
        {activeTab === 'plants' && (
          <div className="p-4">
            <PlantEncyclopedia />
          </div>
        )}

        {/* Care Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="p-4">
            <CareCalendar />
          </div>
        )}
      </div>
    </div>
  );
}
