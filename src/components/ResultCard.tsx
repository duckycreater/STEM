import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, Pill, Info, MessageCircle } from 'lucide-react';
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
        <h3 className="text-lg font-bold text-gray-800 mb-4">Kết quả phân tích</h3>
        <div className="prose prose-sm prose-green max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{result.raw}</p>
        </div>
      </motion.div>
    );
  }

  const severityColor = {
    'nhẹ': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'trung bình': 'bg-orange-100 text-orange-800 border-orange-200',
    'nặng': 'bg-red-100 text-red-800 border-red-200',
  }[result.severity?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">
              Tên bệnh
            </span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {result.diseaseName || 'Không xác định'}
            </h2>
            {plantType && (
              <span className="inline-block mt-1 text-sm text-green-600 font-medium">
                Trên cây {plantType}
              </span>
            )}
          </div>
          
          {result.severity && (
            <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", severityColor)}>
              {result.severity}
            </span>
          )}
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-red-50 p-2 rounded-lg text-red-500 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Nguyên nhân</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.cause || 'Đang cập nhật'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-500 shrink-0">
              <Pill size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Cách chữa trị</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.treatment || 'Đang cập nhật'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-green-50 p-2 rounded-lg text-green-500 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Phòng ngừa</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.prevention || 'Đang cập nhật'}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-3.5 bg-white border border-green-200 text-green-700 rounded-xl font-medium text-sm shadow-sm flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors">
        <MessageCircle size={18} />
        <span>Hỏi thêm chuyên gia AI</span>
      </button>
    </motion.div>
  );
}
