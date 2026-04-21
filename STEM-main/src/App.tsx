import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Sprout, LayoutDashboard, TrendingUp, Settings } from 'lucide-react';
import { cn } from './lib/utils';
import { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { useSettings } from './contexts/SettingsContext';
import { AnimatePresence, motion } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import { getLanguage, type Language, t } from './lib/i18n';
import { QueryProvider } from './providers/QueryProvider';
import { ToastProvider } from './providers/ToastProvider';
import { OnboardingWizard, useOnboarding } from './components/OnboardingWizard';
import { OfflineBanner, InstallPWA, UpdateAvailableBanner } from './components/PWAComponents';
import { initMonitoring } from './lib/analytics';
import { analytics } from './lib/analytics';

const HomePage = lazy(() => import('./pages/HomePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const PlantsPage = lazy(() => import('./pages/PlantsPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const AIChatBot = lazy(() => import('./components/AIChatBot'));

function PageSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-fade-in-up">
      <div className="h-12 skeleton rounded-2xl" />
      <div className="h-48 skeleton rounded-2xl" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-28 skeleton rounded-2xl" />
        <div className="h-28 skeleton rounded-2xl" />
      </div>
      <div className="h-32 skeleton rounded-2xl" />
    </div>
  );
}

function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/market', label: t('nav.market'), icon: TrendingUp },
    { path: '/plants', label: t('nav.plants'), icon: Sprout },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);

  return (
    <div className="fixed bottom-0 w-full glass dark:glass-dark border-t border-gray-200/50 dark:border-white/10 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2 relative">
        <motion.div 
          className="absolute top-1 h-[3px] w-10 bg-emerald-500 rounded-full" 
          animate={{ left: `calc(${(activeIndex >= 0 ? activeIndex : 0) * 20}% + 10% - 20px)` }} 
          transition={{ type: 'spring', stiffness: 400, damping: 30 }} 
        />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative",
                isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              )}
              onClick={() => analytics.tap(`nav_${item.path}`)}
            >
              <motion.div animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              </motion.div>
              <span className={cn("text-[9px] font-semibold tracking-tight transition-opacity", isActive ? "opacity-100" : "opacity-60")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function AppContent() {
  const { largeFont } = useSettings();
  const [showSplash, setShowSplash] = useState(true);
  const [language] = useState<Language>(getLanguage());
  const { showOnboarding, complete: completeOnboarding } = useOnboarding();

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    initMonitoring();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      </AnimatePresence>

      {showOnboarding && <OnboardingWizard onComplete={completeOnboarding} />}

      <OfflineBanner />
      <InstallPWA />
      <UpdateAvailableBanner />

      <div className={cn(
        "min-h-screen bg-gray-50 dark:bg-black pb-16 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300", 
        largeFont ? "text-lg" : "text-base"
      )}>
        <main className="max-w-md mx-auto min-h-screen bg-white dark:bg-gray-950 shadow-sm relative overflow-hidden">
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/plants" element={<PlantsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <AIChatBot />
          </Suspense>
        </main>
        <BottomNav />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
