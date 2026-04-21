// ==========================================
// PlantCare AI — Plant Encyclopedia Component
// ==========================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Leaf, Sprout, Droplets, Sun, Thermometer, Flower2, Calendar, Package } from 'lucide-react';
import { cn } from '../lib/utils';
import { plantEncyclopedia, type Plant } from '../lib/offlineData';
import { t } from '../lib/i18n';

interface PlantEncyclopediaProps {
  onPlantSelect?: (plant: Plant) => void;
}

export function PlantEncyclopedia({ onPlantSelect }: PlantEncyclopediaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPlant, setExpandedPlant] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('plantcare_favorites');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(plantEncyclopedia.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter plants
  const filteredPlants = useMemo(() => {
    return plantEncyclopedia.filter(plant => {
      const matchesSearch = searchQuery === '' || 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.nameVi.includes(searchQuery) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (plantId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(plantId)) {
        newFavorites.delete(plantId);
      } else {
        newFavorites.add(plantId);
      }
      localStorage.setItem('plantcare_favorites', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cereal': return '🌾';
      case 'Vegetable': return '🥬';
      case 'Root/Tuber': return '🥔';
      case 'Legume': return '🫘';
      case 'Tropical Fruit': return '🥭';
      case 'Citrus Fruit': return '🍊';
      case 'Cactus Fruit': return '🌵';
      case 'Beverage Crop': return '☕';
      case 'Industrial Crop': return '🏭';
      default: return '🌱';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm cây trồng..."
          className={cn(
            "w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all",
            "bg-white dark:bg-gray-800",
            "border-gray-200 dark:border-gray-700",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            "text-gray-900 dark:text-white placeholder:text-gray-400"
          )}
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              selectedCategory === category
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {getCategoryIcon(category)} {category === 'all' ? 'Tất cả' : category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Tìm thấy {filteredPlants.length} cây trồng
        {favorites.size > 0 && (
          <span className="ml-2 text-emerald-600">
            ({favorites.size} yêu thích)
          </span>
        )}
      </div>

      {/* Plant List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedPlant(expandedPlant === plant.id ? null : plant.id)}
                className="w-full p-4 flex items-start gap-3 text-left"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl">
                  {getCategoryIcon(plant.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {plant.nameVi}
                    </h4>
                    {favorites.has(plant.id) && (
                      <span className="text-red-500">❤️</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Họ: {plant.family}
                  </p>
                </div>
                {expandedPlant === plant.id ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedPlant === plant.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                      {/* Description */}
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plant.descriptionVi}
                        </p>
                      </div>

                      {/* Growing Conditions */}
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                          <Sun size={16} /> Điều kiện sinh trưởng
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">🌡️ Nhiệt độ:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.growingConditions.temperature}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">💧 Độ ẩm:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.growingConditions.humidity}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <span className="text-gray-500">🌍 Khí hậu:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.growingConditions.climate}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <span className="text-gray-500">🏜️ Đất:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.growingConditions.soil}</span>
                          </div>
                        </div>
                      </div>

                      {/* Planting */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                          <Sprout size={16} /> Trồng trọt
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📅 Mùa vụ:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.planting.season}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📏 Khoảng cách:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.planting.spacing}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <span className="text-gray-500">🔧 Phương pháp:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.planting.method}</span>
                          </div>
                        </div>
                      </div>

                      {/* Care */}
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                          <Droplets size={16} /> Chăm sóc
                        </h5>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">💦 Tưới nước:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.care.watering}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">🧪 Bón phân:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.care.fertilizing}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">✂️ Tỉa cành:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.care.pruning}</span>
                          </div>
                        </div>
                      </div>

                      {/* Common Diseases */}
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                          🦠 Bệnh thường gặp
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {plant.commonDiseases.map(diseaseId => (
                            <span
                              key={diseaseId}
                              className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs"
                            >
                              {diseaseId.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Harvest */}
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                          <Calendar size={16} /> Thu hoạch
                        </h5>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">⏰ Thời gian:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.harvest.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">👀 Dấu hiệu:</span>
                            <span className="text-gray-700 dark:text-gray-300">{plant.harvest.signs}</span>
                          </div>
                        </div>
                      </div>

                      {/* Uses */}
                      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 space-y-2">
                        <h5 className="font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                          <Package size={16} /> Công dụng
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {plant.uses.map((use, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-xs"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => toggleFavorite(plant.id)}
                          className={cn(
                            "flex-1 py-2 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                            favorites.has(plant.id)
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          )}
                        >
                          {favorites.has(plant.id) ? '❤️ Yêu thích' : '🤍 Thêm vào yêu thích'}
                        </button>
                        {onPlantSelect && (
                          <button
                            onClick={() => onPlantSelect(plant)}
                            className="flex-1 py-2 px-4 rounded-xl font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                          >
                            <Search size={16} /> Tìm bệnh
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Leaf size={48} className="mx-auto mb-3 opacity-50" />
          <p>Không tìm thấy cây trồng phù hợp.</p>
          <p className="text-sm mt-1">Thử thay đổi từ khóa hoặc danh mục.</p>
        </div>
      )}
    </div>
  );
}

export default PlantEncyclopedia;
