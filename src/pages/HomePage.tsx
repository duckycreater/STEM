import { useState, useRef } from 'react';
import { Camera, Upload, Leaf, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ResultCard from '../components/ResultCard';
import { GoogleGenAI, Type } from '@google/genai';

const PLANT_TYPES = [
  'Lúa', 'Cà phê', 'Hồ tiêu', 'Sầu riêng', 'Thanh long', 'Rau màu', 'Khác'
];

export default function HomePage() {
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const [prefix, base64Data] = image.split(',');
      const mimeType = prefix.match(/:(.*?);/)?.[1] || 'image/jpeg';

      const prompt = `Bạn là chuyên gia nông nghiệp Việt Nam. Hãy phân tích ảnh cây trồng này. ${selectedPlant ? `Đây là cây ${selectedPlant}. ` : ''}Xác định tên bệnh, nguyên nhân, mức độ nghiêm trọng, cách chữa trị bằng thuốc sẵn có ở Việt Nam, và biện pháp phòng ngừa. Trả lời ngắn gọn, dễ hiểu bằng tiếng Việt cho nông dân.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            }
          ]
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diseaseName: { type: Type.STRING, description: "Tên bệnh" },
              severity: { type: Type.STRING, description: "Mức độ nghiêm trọng (nhẹ/trung bình/nặng)" },
              cause: { type: Type.STRING, description: "Nguyên nhân gây bệnh" },
              treatment: { type: Type.STRING, description: "Cách chữa trị" },
              prevention: { type: Type.STRING, description: "Biện pháp phòng ngừa" }
            },
            required: ["diseaseName", "severity", "cause", "treatment", "prevention"]
          }
        }
      });

      if (!response.text) {
        throw new Error('Không nhận được phản hồi từ AI');
      }

      const data = JSON.parse(response.text);
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
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
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
    <div className="flex flex-col h-full min-h-screen">
      <header className="bg-green-600 text-white p-4 pt-safe-top sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6" />
            <h1 className="text-xl font-bold">PlantCare AI</h1>
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
              className="space-y-6"
            >
              <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                <h2 className="text-lg font-semibold text-green-800 mb-2">Chẩn đoán bệnh cây trồng</h2>
                <p className="text-sm text-green-600">Chụp ảnh lá, quả hoặc thân cây bị bệnh để nhận diện và hướng dẫn chữa trị ngay lập tức.</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Chọn loại cây (Tùy chọn)</label>
                <div className="flex flex-wrap gap-2">
                  {PLANT_TYPES.map(plant => (
                    <button
                      key={plant}
                      onClick={() => setSelectedPlant(plant === selectedPlant ? '' : plant)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        selectedPlant === plant 
                          ? "bg-green-600 text-white border-green-600" 
                          : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
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
                  className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-green-300 rounded-2xl hover:bg-green-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600">
                    <Camera size={24} />
                  </div>
                  <span className="font-medium text-gray-800">Chụp ảnh</span>
                  <span className="text-xs text-gray-500 mt-1">Dùng camera</span>
                </button>
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-blue-300 rounded-2xl hover:bg-blue-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600">
                    <Upload size={24} />
                  </div>
                  <span className="font-medium text-gray-800">Tải ảnh lên</span>
                  <span className="text-xs text-gray-500 mt-1">Từ thư viện</span>
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
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-black">
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
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-95"
                >
                  <Leaf size={20} />
                  <span>Phân tích bệnh ngay</span>
                </button>
              )}

              {loading && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-green-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                    <Leaf className="absolute inset-0 m-auto text-green-600 animate-pulse" size={24} />
                  </div>
                  <p className="text-gray-600 font-medium animate-pulse">Đang phân tích hình ảnh...</p>
                  <p className="text-xs text-gray-400 text-center">AI đang quét các dấu hiệu bệnh lý trên lá và thân cây.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-red-800 font-medium">Lỗi phân tích</h3>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                    <button 
                      onClick={analyzeImage}
                      className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                    >
                      Thử lại
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
