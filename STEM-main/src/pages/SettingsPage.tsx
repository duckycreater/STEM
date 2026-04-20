import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Moon, Type, WifiOff, Leaf, Settings as SettingsIcon, Smartphone, Shield, Info, ChevronRight, ExternalLink, Globe, Star, Heart, Github } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { t, getLanguage, type Language } from '../lib/i18n';

export default function SettingsPage() {
  const { darkMode, setDarkMode, largeFont, setLargeFont, ruralMode, setRuralMode, isOffline } = useSettings();
  const [language, setLang] = useState<Language>(getLanguage());

  const handleLanguageChange = (lang: Language) => {
    setLang(lang);
    document.documentElement.lang = lang;
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-black">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 pt-safe-top sticky top-0 z-10">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <SettingsIcon className="text-gray-600 dark:text-gray-300" size={18} />
          </div>
          {t('settings.title')}
        </h1>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24 space-y-6">
        {isOffline && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-2xl flex items-start gap-3 border border-orange-200 dark:border-orange-800">
            <WifiOff className="shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-bold text-sm">{t('common.offline')} Mode</p>
              <p className="text-xs mt-0.5 opacity-80">{language === 'vi' ? 'Bạn vẫn có thể tìm kiếm 261 bệnh offline.' : 'You can still search 261 diseases offline.'}</p>
            </div>
          </motion.div>
        )}

        {/* Language */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">{t('settings.language')}</h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <Globe className="text-emerald-600 dark:text-emerald-400" size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t('settings.language')}</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{language === 'vi' ? 'Tiếng Việt' : 'English'}</p>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button onClick={() => handleLanguageChange('vi')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === 'vi' ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-sm' : 'text-gray-500'}`}>VI</button>
                <button onClick={() => handleLanguageChange('en')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-sm' : 'text-gray-500'}`}>EN</button>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Appearance</h2>
          <div className="space-y-2">
            <SettingToggle icon={<Moon size={18} />} iconBg="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" title={t('settings.darkMode')} subtitle={language === 'vi' ? 'Giảm mỏi mắt vào ban đêm' : 'Reduce eye strain at night'} checked={darkMode} onChange={setDarkMode} color="peer-checked:bg-indigo-500" />
            <SettingToggle icon={<Type size={18} />} iconBg="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" title={t('settings.largeFont')} subtitle={language === 'vi' ? 'Dễ đọc trên màn hình nhỏ' : 'Easier to read on small screens'} checked={largeFont} onChange={setLargeFont} color="peer-checked:bg-blue-500" />
          </div>
        </div>

        {/* Performance */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Performance</h2>
          <div className="space-y-2">
            <SettingToggle icon={<Leaf size={18} />} iconBg="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" title={t('settings.ruralMode')} subtitle={language === 'vi' ? 'Nén ảnh, tiết kiệm dữ liệu' : 'Compress images, save mobile data'} checked={ruralMode} onChange={setRuralMode} color="peer-checked:bg-emerald-500" />
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">About</h2>
          <div className="space-y-2">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Smartphone size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{t('common.appName')}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{t('settings.version')} 2.0 • Powered by Gemini & Groq</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                  <Shield size={18} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">Privacy</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{language === 'vi' ? 'Ảnh được xử lý an toàn' : 'Images are processed securely'}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center pt-4 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart size={14} className="text-red-500 fill-red-500" />
            <p className="text-xs text-gray-400 dark:text-gray-500">Made with 💚 for STEM Research</p>
          </div>
          <p className="text-[10px] text-gray-300 dark:text-gray-600">AI-powered agricultural technology</p>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ icon, iconBg, title, subtitle, checked, onChange, color }: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={cn(
          "w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer",
          "peer-checked:after:translate-x-full peer-checked:after:border-white",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white",
          "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
          "after:shadow-sm",
          color
        )} />
      </label>
    </div>
  );
}
