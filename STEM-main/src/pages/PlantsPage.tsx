import { useState, useMemo } from 'react';
import { BookOpen, Search, Leaf, ChevronDown, ChevronUp, AlertTriangle, Pill, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { offlineDiseases, searchOfflineDisease } from '../lib/offlineData';
import type { OfflineDisease } from '../types';
import { t, getLanguage } from '../lib/i18n';

const SEVERITY_FILTERS = ['All', 'Common', 'Severe'];

export default function PlantsPage() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [language] = useState(getLanguage());

  const filteredDiseases = useMemo(() => {
    let results = search.trim() ? searchOfflineDisease(search) : offlineDiseases;
    if (severityFilter !== 'All') {
      results = results.filter((d: OfflineDisease) => {
        // Simple severity determination based on keywords
        if (severityFilter === 'Severe') {
          return d.keywords.some(k => ['fatal', 'no cure', 'severe', 'deadly'].includes(k.toLowerCase()));
        }
        return true;
      });
    }
    return results;
  }, [search, severityFilter]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
              <BookOpen className="text-emerald-600 dark:text-emerald-400" size={18} />
            </div>
            {t('diseases.dictionary')}
          </h1>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-lg">
            {offlineDiseases.length} {language === 'vi' ? 'bệnh' : 'diseases'}
          </span>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
          <input type="text" placeholder={t('diseases.search')} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/50 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
        </div>

        {/* Severity Filter */}
        <div className="flex gap-2">
          {SEVERITY_FILTERS.map(filter => (
            <button key={filter} onClick={() => setSeverityFilter(filter)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${severityFilter === filter ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              {filter === 'All' ? (language === 'vi' ? 'Tất cả' : 'All') : filter}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {filteredDiseases.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-gray-500">
            <Search size={32} className="mb-2 text-gray-300 dark:text-gray-600" />
            <p className="font-semibold">{language === 'vi' ? 'Không tìm thấy bệnh' : 'No diseases found'}</p>
            <p className="text-xs mt-1">{t('diseases.tryKeywords')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {search && (
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2">
                {language === 'vi' ? `Tìm thấy ${filteredDiseases.length} kết quả` : `Found ${filteredDiseases.length} result${filteredDiseases.length > 1 ? 's' : ''}`} for "{search}"
              </p>
            )}
            {filteredDiseases.map((disease, index) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} key={disease.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                <button onClick={() => toggleExpand(disease.id)} className="w-full p-4 flex items-start space-x-4 text-left">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400"><Leaf size={22} /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{disease.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{disease.symptoms}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {disease.keywords.slice(0, 3).map(k => (
                        <span key={k} className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-gray-400 dark:text-gray-500 mt-1">{expandedId === disease.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </button>

                <AnimatePresence>
                  {expandedId === disease.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0"><AlertTriangle size={14} className="text-red-500" /></div>
                          <div>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-0.5">{t('diagnosis.severity')}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{disease.symptoms}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0"><Pill size={14} className="text-blue-500" /></div>
                          <div>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-0.5">{t('diagnosis.treatment')}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{disease.treatment}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
