import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, History, Sprout, Users, LayoutDashboard, TrendingUp } from 'lucide-react';
import { cn } from './lib/utils';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import PlantsPage from './pages/PlantsPage';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage';
import AIChatBot from './components/AIChatBot';

function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Khám bệnh', icon: Home },
    { path: '/dashboard', label: 'Trang trại', icon: LayoutDashboard },
    { path: '/market', label: 'Thị trường', icon: TrendingUp },
    { path: '/history', label: 'Lịch sử', icon: History },
    { path: '/plants', label: 'Từ điển', icon: Sprout },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe z-50">
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
                isActive ? "text-emerald-600 scale-110" : "text-gray-500 hover:text-emerald-500"
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
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 pb-16 font-sans">
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/plants" element={<PlantsPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
          <AIChatBot />
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
