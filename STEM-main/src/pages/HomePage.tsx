import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Camera, Upload, Leaf, AlertCircle, RefreshCw, ChevronRight, Zap, Mic, MicOff, Sparkles, ScanLine, X, Clock, BarChart3, Shield, Pill, AlertTriangle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ResultCard from '../components/ResultCard';
import type { DiagnosisResult, HistoryItem } from '../types';
import { t, setLanguage, getLanguage, type Language } from '../lib/i18n';

const PLANT_TYPES = [
  { name: 'Gạo', emoji: '🌾', key: 'rice' },
  { name: 'Cà phê', emoji: '☕', key: 'coffee' },
  { name: 'Tiêu', emoji: '🌶️', key: 'pepper' },
  { name: 'Sầu riêng', emoji: '🍈', key: 'durian' },
  { name: 'Thanh long', emoji: '🐉', key: 'dragonfruit' },
  { name: 'Rau', emoji: '🥬', key: 'vegetables' },
  { name: 'Chuối', emoji: '🍌', key: 'banana' },
  { name: 'Xoài', emoji: '🥭', key: 'mango' },
  { name: 'Khác', emoji: '🌱', key: 'other' },
];

export default function HomePage() {
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioNote, setAudioNote] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [language, setLang] = useState<Language>(getLanguage());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLang(lang);
    // Force re-render by updating DOM lang attribute
    document.documentElement.lang = lang;
  };

  // Quick Stats
  const stats = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem('plantcare_history') || '[]') as HistoryItem[];
      const totalScans = data.length;
      const today = new Date().toDateString();
      const scansToday = data.filter(h => new Date(h.date).toDateString() === today).length;
      return { totalScans, scansToday };
    } catch { return { totalScans: 0, scansToday: 0 }; }
  }, [result]);

  // Scan progress animation
  useEffect(() => {
    if (!loading) { setScanProgress(0); return; }
    const interval = setInterval(() => {
      setScanProgress(prev => prev >= 95 ? 95 : prev + Math.random() * 8 + 2);
    }, 200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setResult(null);
          setError(null);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error processing image:", err);
        setError(t('errors.processingError'));
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          stream.getTracks().forEach(track => track.stop());
          try {
            setLoading(true);
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.webm');
            const response = await fetch('/api/transcribe', {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            if (data.text) {
              setAudioNote(prev => prev ? prev + ' ' + data.text : data.text);
            }
          } catch (err) {
            console.error("Transcription error:", err);
          } finally {
            setLoading(false);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access error:", err);
      }
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      if (selectedPlant) formData.append('plantType', selectedPlant);
      if (audioNote) formData.append('audioNote', audioNote);

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Analysis failed');

      setResult(data.data);
      setScanProgress(100);

      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image,
        plantType: selectedPlant,
        result: data.data,
      };
      const existingHistory = JSON.parse(localStorage.getItem('plantcare_history') || '[]');
      localStorage.setItem('plantcare_history', JSON.stringify([historyItem, ...existingHistory].slice(0, 50)));

    } catch (err: any) {
      console.error(err);
      setError(err.message || t('errors.tryAgain'));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setAudioNote('');
    setScanProgress(0);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      {/* Premium Header */}
      <header className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-950 text-white p-5 pt-safe-top sticky top-0 z-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-teal-300/10 rounded-full blur-2xl" />
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">{t('common.appName')}</h1>
              <p className="text-emerald-200/70 text-[10px] font-medium">
                {language === 'vi' ? 'Chẩn đoán bệnh thông minh' : 'Smart Disease Detection'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/15 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
              <Globe size={12} className="text-emerald-200" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-transparent text-[10px] font-semibold text-emerald-200 focus:outline-none cursor-pointer"
              >
                <option value="vi" className="text-gray-900">VI</option>
                <option value="en" className="text-gray-900">EN</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {!image ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Quick Stats Row */}
              <div className="grid grid-cols-3 gap-2.5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm"
                >
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <BarChart3 size={14} className="text-blue-500" />
                  </div>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{stats.totalScans}</p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 font-semibold">{t('home.stats.totalScans')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm"
                >
                  <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <Clock size={14} className="text-emerald-500" />
                  </div>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">{stats.scansToday}</p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 font-semibold">{t('home.stats.todayScans')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm"
                >
                  <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <Shield size={14} className="text-purple-500" />
                  </div>
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">261</p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 font-semibold">{t('home.stats.diseasesDB')}</p>
                </motion.div>
              </div>

              {/* Plant Type Selector - Horizontal scroll */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" />
                  {t('home.selectPlant')}
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                  {PLANT_TYPES.map(plant => (
                    <motion.button
                      key={plant.key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPlant(plant.key === selectedPlant ? '' : plant.key)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap border shrink-0",
                        selectedPlant === plant.key
                          ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                          : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      <span className="text-base">{plant.emoji}</span>
                      {plant.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Upload Zone - with Drag & Drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative rounded-3xl border-2 border-dashed p-8 transition-all duration-300",
                  isDragging
                    ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 scale-[1.02]"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                )}
              >
                {isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-50/80 dark:bg-emerald-900/40 rounded-3xl z-10 backdrop-blur-sm">
                    <div className="text-center">
                      <Upload size={40} className="text-emerald-500 mx-auto mb-3 animate-bounce" />
                      <p className="font-bold text-emerald-700 dark:text-emerald-300">Drop your image here</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-800/50 rounded-2xl flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-sm">
                      <Camera size={26} />
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{t('home.takePhoto')}</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{language === 'vi' ? 'Dùng camera' : 'Use camera'}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-800/50 rounded-2xl flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm">
                      <Upload size={26} />
                    </div>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{t('home.uploadPhoto')}</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{language === 'vi' ? 'Từ thư viện' : 'From gallery'}</span>
                  </motion.button>
                </div>

                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                  {t('home.dragDrop')}
                </p>
              </div>

              {/* Voice Note */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('home.voiceNote')}</label>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleRecording}
                    className={cn(
                      "p-2.5 rounded-xl transition-all relative",
                      isRecording ? "bg-red-100 dark:bg-red-900/30 text-red-500" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-emerald-100 hover:text-emerald-600"
                    )}
                  >
                    {isRecording && (
                      <span className="absolute inset-0 rounded-xl bg-red-400/30 animate-pulse-ring" />
                    )}
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </motion.button>
                </div>
                {audioNote && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 italic">
                    "{audioNote}"
                  </div>
                )}
                {isRecording && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-500">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    {t('home.recording')}
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" capture="environment" className="hidden" ref={cameraInputRef} onChange={handleImageUpload} />
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Image Preview */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black group">
                <img src={image} alt="Uploaded plant" className="w-full h-72 object-contain" />

                {loading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 border-4 border-emerald-400/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-emerald-400 rounded-full border-t-transparent animate-radar" />
                      <ScanLine className="absolute inset-0 m-auto text-emerald-400 animate-pulse" size={28} />
                    </div>
                    <p className="text-white font-bold text-sm">{t('home.analyzing')}</p>
                    <div className="w-48 h-1.5 bg-white/20 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <p className="text-emerald-300/70 text-[10px] mt-2">{Math.round(scanProgress)}% analyzed</p>
                  </div>
                )}

                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={reset}
                    className="bg-black/50 text-white p-2.5 rounded-xl backdrop-blur-md hover:bg-black/70 transition-colors border border-white/10"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {!result && !loading && !error && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={analyzeImage}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all"
                >
                  <Sparkles size={20} />
                  <span>{t('common.analyze')}</span>
                </motion.button>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start space-x-3"
                >
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-red-800 dark:text-red-200 font-bold">{t('common.error')}</h3>
                    <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
                    <button
                      onClick={analyzeImage}
                      className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-xl text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                    >
                      {t('common.retry')}
                    </button>
                  </div>
                </motion.div>
              )}

              {result && (
                <ResultCard result={result} plantType={selectedPlant} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
