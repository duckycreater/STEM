import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Moon, Type, WifiOff, Leaf, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const { darkMode, setDarkMode, largeFont, setLargeFont, ruralMode, setRuralMode, isOffline } = useSettings();

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50 dark:bg-black">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="text-emerald-600 dark:text-emerald-400" size={28} />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {isOffline && (
        <div className="mb-6 p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-xl flex items-start gap-3">
          <WifiOff className="shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold">Offline</p>
            <p className="text-sm mt-1">App is running in offline mode. You can still search 100 common diseases.</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Dark Mode */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
              <Moon size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Dark Mode</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Reduce eye strain at night</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* Large Font */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Type size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Large Font</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Easier to read for seniors</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={largeFont} onChange={(e) => setLargeFont(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {/* Rural Mode */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <Leaf size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Rural Mode</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Save 3G/4G data, run smoothly on older devices</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={ruralMode} onChange={(e) => setRuralMode(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
