import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, Pill, Info, MessageCircle, CheckCircle2, Activity, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResultCardProps {
  result: any;
  plantType?: string;
}

export default function ResultCard({ result, plantType }: ResultCardProps) {
  const isRaw = !!result.raw;
  
  if (isRaw) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Analysis Result</h3>
        <div className="prose prose-sm prose-green max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{result.raw}</p>
        </div>
      </motion.div>
    );
  }

  const severityLower = result.severity?.toLowerCase() || '';
  let severityColor = 'bg-gray-100 text-gray-800 border-gray-200';
  let severityIcon = <Info size={16} />;
  let borderColor = 'bg-gray-500';

  if (severityLower.includes('nguy cơ cao') || severityLower.includes('nặng') || severityLower.includes('severe') || severityLower.includes('high risk')) {
    severityColor = 'bg-red-100 text-red-800 border-red-200';
    severityIcon = <AlertTriangle size={16} />;
    borderColor = 'bg-red-500';
  } else if (severityLower.includes('trung bình') || severityLower.includes('moderate')) {
    severityColor = 'bg-orange-100 text-orange-800 border-orange-200';
    severityIcon = <Activity size={16} />;
    borderColor = 'bg-orange-500';
  } else if (severityLower.includes('khỏe mạnh') || severityLower.includes('healthy') || severityLower.includes('nhẹ') || severityLower.includes('mild')) {
    severityColor = 'bg-green-100 text-green-800 border-green-200';
    severityIcon = <CheckCircle2 size={16} />;
    borderColor = 'bg-green-500';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-1 h-full ${borderColor}`}></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">
              Tên bệnh / Trạng thái
            </span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {result.diseaseName || 'Không xác định'}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              {plantType && (
                <span className="inline-block text-xs text-green-700 bg-green-50 px-2 py-1 rounded-md font-medium border border-green-100">
                  Cây {plantType}
                </span>
              )}
              {result.confidence && (
                <span className="inline-block text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded-md font-medium border border-blue-100">
                  Độ tin cậy: {result.confidence}
                </span>
              )}
            </div>
          </div>
          
          {result.severity && (
            <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border", severityColor)}>
              {severityIcon}
              {result.severity}
            </span>
          )}
        </div>

        <div className="space-y-5 mt-6">
          {/* Layer 2: Explanation */}
          {(result.explanation || result.cause) && (
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-500 shrink-0 mt-0.5">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Giải thích & Dấu hiệu</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.explanation || result.cause}</p>
              </div>
            </div>
          )}

          {/* Layer 3: Action */}
          {result.treatment && (
            <div className="flex items-start space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-500 shrink-0 mt-0.5">
                <Pill size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Cách xử lý đề xuất</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.treatment}</p>
                {result.actionAdvice && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 border border-gray-200">
                    <Zap size={14} className={result.actionAdvice.toLowerCase().includes('ngay') ? 'text-amber-500' : 'text-blue-500'} />
                    {result.actionAdvice}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prevention */}
          {result.prevention && (
            <div className="flex items-start space-x-3">
              <div className="bg-green-50 p-2 rounded-lg text-green-500 shrink-0 mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Phòng ngừa</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.prevention}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="w-full py-3.5 bg-white border border-green-200 text-green-700 rounded-xl font-medium text-sm shadow-sm flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors">
        <MessageCircle size={18} />
        <span>Ask AI Expert</span>
      </button>
    </motion.div>
  );
}
