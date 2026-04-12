import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, History, Sprout, LayoutDashboard, TrendingUp, Settings } from 'lucide-react';
import { cn } from './lib/utils';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import PlantsPage from './pages/PlantsPage';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage';
import SettingsPage from './pages/SettingsPage';
import AIChatBot from './components/AIChatBot';
import { useSettings } from './contexts/SettingsContext';

function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Diagnose', icon: Home },
    { path: '/dashboard', label: 'Farm', icon: LayoutDashboard },
    { path: '/market', label: 'Market', icon: TrendingUp },
    { path: '/plants', label: 'Dictionary', icon: Sprout },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200",
                isActive ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-medium tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const { largeFont } = useSettings();

  return (
    <BrowserRouter>
      <div className={cn(
        "min-h-screen bg-gray-50 dark:bg-black pb-16 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-200",
        largeFont ? "text-lg" : "text-base"
      )}>
        <main className="max-w-md mx-auto min-h-screen bg-white dark:bg-gray-950 shadow-sm relative overflow-hidden">
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
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
