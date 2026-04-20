import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  largeFont: boolean;
  setLargeFont: (val: boolean) => void;
  ruralMode: boolean;
  setRuralMode: (val: boolean) => void;
  isOffline: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [largeFont, setLargeFont] = useState(() => localStorage.getItem('largeFont') === 'true');
  const [ruralMode, setRuralMode] = useState(() => localStorage.getItem('ruralMode') === 'true');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('largeFont', String(largeFont));
  }, [largeFont]);

  useEffect(() => {
    localStorage.setItem('ruralMode', String(ruralMode));
  }, [ruralMode]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode, largeFont, setLargeFont, ruralMode, setRuralMode, isOffline }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
