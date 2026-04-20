import { useState, useEffect, useCallback } from 'react';
import { Settings, Languages, LogOut, User, Shield, ChevronRight, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useSettings } from '../contexts/SettingsContext';
import { t, getLanguage, type Language } from '../lib/i18n';

export default function CommunityPage() {
  const [language] = useState<Language>(getLanguage());

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Settings className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            {language === 'vi' ? 'Cộng đồng' : 'Community'}
          </h1>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={48} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {language === 'vi' ? 'Tính năng sắp ra mắt' : 'Coming Soon'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {language === 'vi' ? 'Cộng đồng nông dân sẽ sớm có mặt!' : 'Farmer community coming soon!'}
          </p>
        </div>
      </div>
    </div>
  );
}
