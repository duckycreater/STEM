import { BookOpen, Search, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const COMMON_DISEASES = [
  { name: 'Rice Blast', plant: 'Rice', severity: 'Severe', desc: 'Disease caused by the fungus Pyricularia oryzae.' },
  { name: 'Coffee Rust', plant: 'Coffee', severity: 'Moderate', desc: 'Disease caused by the fungus Hemileia vastatrix.' },
  { name: 'Anthracnose', plant: 'Mango', severity: 'Severe', desc: 'Disease caused by the fungus Colletotrichum gloeosporioides.' },
  { name: 'Late Blight', plant: 'Tomato', severity: 'Severe', desc: 'Disease caused by the fungus Phytophthora infestans.' },
  { name: 'Quick Wilt', plant: 'Pepper', severity: 'Very Severe', desc: 'Disease caused by the fungus Phytophthora capsici.' },
];

export default function PlantsPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 pt-safe-top sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Plant Disease Dictionary</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search diseases, plants..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Common Diseases</h2>
          <div className="space-y-3">
            {COMMON_DISEASES.map((disease, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start space-x-4 hover:border-green-300 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0 text-green-600">
                  <Leaf size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{disease.name}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1 mb-2">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{disease.plant}</span>
                    <span className="text-red-500 font-medium">{disease.severity}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{disease.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
