import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, Pill, MessageCircle, Share2, ChevronDown, ChevronUp, Download, Printer, Bookmark, BookmarkCheck, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import type { DiagnosisResult } from '../types';
import { t, getLanguage } from '../lib/i18n';

interface ResultCardProps {
  result: DiagnosisResult;
  plantType?: string;
}

export default function ResultCard({ result, plantType }: ResultCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [saved, setSaved] = useState(false);
  const [language] = useState(getLanguage());

  const isRaw = !!result.raw;

  if (isRaw) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-extrabold text-gray-800 dark:text-white mb-4">Analysis Result</h3>
        <div className="prose prose-sm prose-green dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{result.raw}</p>
        </div>
      </motion.div>
    );
  }

  const severityConfig: Record<string, { bg: string; dot: string; label: string }> = {
    'mild': { bg: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800', dot: 'bg-yellow-500', label: language === 'vi' ? 'Nhẹ' : 'Mild' },
    'moderate': { bg: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800', dot: 'bg-orange-500', label: language === 'vi' ? 'Trung bình' : 'Moderate' },
    'severe': { bg: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800', dot: 'bg-red-500', label: language === 'vi' ? 'Nghiêm trọng' : 'Severe' },
  };
  const severity = result.severity?.toLowerCase() || '';
  const config = severityConfig[severity] || { bg: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700', dot: 'bg-gray-400', label: severity };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      {/* Main result card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-500" />

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 block">
              {t('diagnosis.diseaseName')}
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {result.diseaseName || (language === 'vi' ? 'Không xác định' : 'Unknown')}
            </h2>
            {plantType && (
              <span className="inline-flex items-center gap-1 mt-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                🌱 {plantType}
              </span>
            )}
          </div>

          {result.severity && (
            <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border", config.bg)}>
              <span className={cn("w-2 h-2 rounded-full animate-pulse", config.dot)} />
              {config.label}
            </span>
          )}
        </div>

        {/* Expand/Collapse button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-4"
        >
          <Sparkles size={12} />
          {expanded ? (language === 'vi' ? 'Ẩn chi tiết' : 'Hide details') : (language === 'vi' ? 'Xem chi tiết' : 'Show details')}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Details */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="space-y-4 pt-2">
                <DetailRow icon={<AlertTriangle size={16} />} iconBg="bg-red-50 dark:bg-red-900/30 text-red-500" label={t('diagnosis.cause')} content={result.cause || (language === 'vi' ? 'Không có thông tin' : 'No information')} />
                <DetailRow icon={<Pill size={16} />} iconBg="bg-blue-50 dark:bg-blue-900/30 text-blue-500" label={t('diagnosis.treatment')} content={result.treatment || (language === 'vi' ? 'Không có thông tin' : 'No information')} />
                <DetailRow icon={<ShieldCheck size={16} />} iconBg="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500" label={t('diagnosis.prevention')} content={result.prevention || (language === 'vi' ? 'Không có thông tin' : 'No information')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        <motion.button whileTap={{ scale: 0.97 }} className="py-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center space-x-2 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/50 dark:hover:to-teal-900/50 transition-all">
          <MessageCircle size={16} />
          <span>{language === 'vi' ? 'Hỏi AI' : 'Ask AI'}</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} className="py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          {saved ? <BookmarkCheck size={16} className="text-emerald-600" /> : <Bookmark size={16} />}
          <span>{saved ? (language === 'vi' ? 'Đã lưu' : 'Saved') : (language === 'vi' ? 'Lưu' : 'Save')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function DetailRow({ icon, iconBg, label, content }: { icon: React.ReactNode; iconBg: string; label: string; content: string }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div layout className="flex items-start space-x-3">
      <div className={cn("p-2 rounded-xl shrink-0", iconBg)}>{icon}</div>
      <div className="flex-1">
        <h4 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
          {label}
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </h4>
        <AnimatePresence>
          {expanded && (
            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {content}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { AnimatePresence } from 'motion/react';
