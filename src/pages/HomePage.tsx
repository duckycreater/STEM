import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Leaf, AlertCircle, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ResultCard from '../components/ResultCard';
import { GoogleGenAI } from '@google/genai';
import imageCompression from 'browser-image-compression';
import { useSettings } from '../contexts/SettingsContext';
import { offlineDiseases } from '../lib/offlineData';

const PLANT_TYPES = [
  'Rice', 'Coffee', 'Pepper', 'Durian', 'Dragon Fruit', 'Vegetables', 'Other'
];

export default function HomePage() {
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [todayDisease, setTodayDisease] = useState(offlineDiseases[0]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const { ruralMode, isOffline } = useSettings();

  useEffect(() => {
    // Randomly pick a disease for "Today's common disease" widget
    const randomIndex = Math.floor(Math.random() * offlineDiseases.length);
    setTodayDisease(offlineDiseases[randomIndex]);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        let fileToProcess = file;
        
        // Rural mode: Compress image to save data
        if (ruralMode) {
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true
          };
          fileToProcess = await imageCompression(file, options);
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setResult(null);
          setError(null);
        };
        reader.readAsDataURL(fileToProcess);
      } catch (err) {
        console.error("Error compressing image:", err);
        setError("Error processing image. Please try again.");
      }
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (isOffline) {
        // Offline fallback: Simulate analysis or show offline message
        setTimeout(() => {
          setResult({
            diseaseName: "Cannot identify (Offline Mode)",
            severity: "Unknown",
            cause: "You are offline. AI needs an internet connection to analyze images.",
            treatment: "Please connect to the internet to use the image recognition feature. You can still search for common diseases in the Dictionary or Chatbot.",
            prevention: "Ensure your phone has a 3G/4G or Wi-Fi connection."
          });
          setLoading(false);
        }, 1500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
      const prompt = `You are an agricultural expert. Analyze this plant image. ${selectedPlant ? `This is a ${selectedPlant} plant. ` : ''}Identify the disease name, cause, severity, treatment, and prevention. Reply concisely in English. Return JSON format with fields: diseaseName, severity, cause, treatment, prevention.`;

      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const reply = response.text;

      if (!reply) {
        throw new Error('No response received from AI');
      }

      const data = JSON.parse(reply);
      setResult(data);
      
      // Save to history
      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image,
        plantType: selectedPlant,
        result: data
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('plantcare_history') || '[]');
      localStorage.setItem('plantcare_history', JSON.stringify([historyItem, ...existingHistory].slice(0, 50)));
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-emerald-600 dark:bg-emerald-800 text-white p-4 pt-safe-top sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6" />
            <h1 className="text-xl font-bold">PlantCare AI</h1>
          </div>
          {ruralMode && (
            <div className="flex items-center gap-1 bg-emerald-700 dark:bg-emerald-900 px-2 py-1 rounded-full text-xs font-medium">
              <Zap size={12} className="text-yellow-300" />
              <span>Rural</span>
            </div>
          )}
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
              className="space-y-6"
            >
              {/* Widget: Bệnh phổ biến hôm nay + Chụp nhanh */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-white/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Today's Alert</span>
                      <h2 className="text-xl font-bold mt-2 leading-tight">{todayDisease.name}</h2>
                    </div>
                    <button 
                      onClick={() => cameraInputRef.current?.click()}
                      className="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform shrink-0"
                    >
                      <Camera size={26} />
                    </button>
                  </div>
                  <p className="text-sm text-emerald-50 line-clamp-2 mb-3 opacity-90">{todayDisease.symptoms}</p>
                  <button className="text-xs font-semibold flex items-center gap-1 bg-black/20 hover:bg-black/30 w-fit px-3 py-1.5 rounded-full transition-colors">
                    View Treatment <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Plant (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {PLANT_TYPES.map(plant => (
                    <button
                      key={plant}
                      onClick={() => setSelectedPlant(plant === selectedPlant ? '' : plant)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        selectedPlant === plant 
                          ? "bg-emerald-600 text-white border-emerald-600" 
                          : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                      )}
                    >
                      {plant}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button 
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                    <Camera size={24} />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Take Photo</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use camera</span>
                </button>
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                    <Upload size={24} />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Upload Photo</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">From gallery</span>
                </button>
              </div>

              <input 
                type="file" 
                accept="image/*" 
                capture="environment"
                className="hidden" 
                ref={cameraInputRef}
                onChange={handleImageUpload}
              />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-black">
                <img src={image} alt="Uploaded plant" className="w-full h-64 object-contain" />
                <button 
                  onClick={reset}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {!result && !loading && !error && (
                <button 
                  onClick={analyzeImage}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-95"
                >
                  <Leaf size={20} />
                  <span>Analyze Disease Now</span>
                </button>
              )}

              {loading && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-emerald-100 dark:border-emerald-900 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                    <Leaf className="absolute inset-0 m-auto text-emerald-600 animate-pulse" size={24} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">Analyzing image...</p>
                  <p className="text-xs text-gray-400 text-center">AI is scanning for disease signs on leaves and stems.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start space-x-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-red-800 dark:text-red-200 font-medium">Analysis Error</h3>
                    <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
                    <button 
                      onClick={analyzeImage}
                      className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
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
