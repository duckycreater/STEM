// ==========================================
// PlantCare AI — PWA Enhancements & Offline Sync
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, CloudOff, Check, AlertCircle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useCustom';

// ==========================================
// Offline Banner Component
// ==========================================

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
    } else {
      // Keep showing for 3 seconds after reconnecting
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium"
        >
          {isOnline ? (
            <>
              <Check size={16} />
              <span>Kết nối đã khôi phục!</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span>Bạn đang offline. Một số tính năng bị giới hạn.</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// Sync Status Indicator
// ==========================================

interface SyncStatus {
  pending: number;
  synced: number;
  failed: number;
  lastSync?: Date;
}

export function SyncStatusIndicator() {
  const isOnline = useOnlineStatus();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    pending: 0,
    synced: 0,
    failed: 0,
  });

  // Simulated sync status (in real app, this would come from a service)
  useEffect(() => {
    const checkSync = () => {
      try {
        const pendingData = localStorage.getItem('sync_pending');
        const pending = pendingData ? JSON.parse(pendingData).length : 0;

        setSyncStatus({
          pending,
          synced: 0,
          failed: 0,
          lastSync: new Date(),
        });
      } catch (e) {
        // Ignore
      }
    };

    checkSync();
    const interval = setInterval(checkSync, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isOnline) {
    return (
      <div className="flex items-center gap-1 text-amber-500">
        <CloudOff size={14} />
        <span className="text-xs">Offline</span>
      </div>
    );
  }

  if (syncStatus.pending > 0) {
    return (
      <div className="flex items-center gap-1 text-blue-500">
        <RefreshCw size={14} className="animate-spin" />
        <span className="text-xs">{syncStatus.pending} đang chờ</span>
      </div>
    );
  }

  if (syncStatus.failed > 0) {
    return (
      <div className="flex items-center gap-1 text-red-500">
        <AlertCircle size={14} />
        <span className="text-xs">{syncStatus.failed} thất bại</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-emerald-500">
      <Check size={14} />
      <span className="text-xs">Đã đồng bộ</span>
    </div>
  );
}

// ==========================================
// Install PWA Prompt
// ==========================================

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const install = useCallback(async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      setCanInstall(false);
      setIsInstalled(true);
    }
  }, [installPrompt]);

  const dismiss = useCallback(() => {
    setCanInstall(false);
  }, []);

  return { canInstall, isInstalled, install, dismiss };
}

// ==========================================
// Install PWA Banner
// ==========================================

export function InstallPWA() {
  const { canInstall, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem('pwa_install_dismissed');
    if (wasDismissed) setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (!canInstall || dismissed) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 z-50 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🌿</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white">Cài đặt PlantCare AI</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Thêm vào màn hình chính để trải nghiệm tốt hơn
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleDismiss}
          className="flex-1 py-2 px-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Không
        </button>
        <button
          onClick={install}
          className="flex-1 py-2 px-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          Cài đặt
        </button>
      </div>
    </motion.div>
  );
}

// ==========================================
// Service Worker Update
// ==========================================

export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg as ServiceWorkerRegistration);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });
      });
    }
  }, []);

  const applyUpdate = useCallback(async () => {
    if (!registration) return;

    await registration.unregister();
    window.location.reload();
  }, [registration]);

  return { updateAvailable, applyUpdate };
}

// ==========================================
// Update Available Banner
// ==========================================

export function UpdateAvailableBanner() {
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();

  if (!updateAvailable) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-600 text-white rounded-2xl shadow-2xl p-4 z-50"
    >
      <div className="flex items-center gap-3">
        <RefreshCw size={20} />
        <div className="flex-1">
          <p className="font-medium">Có bản cập nhật mới!</p>
          <p className="text-sm text-blue-100">Nhấn để cập nhật ngay</p>
        </div>
      </div>
      <button
        onClick={applyUpdate}
        className="w-full mt-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
      >
        Cập nhật ngay
      </button>
    </motion.div>
  );
}

// ==========================================
// Cache Status
// ==========================================

interface CacheStats {
  totalSize: number;
  itemCount: number;
  oldestItem?: Date;
}

export function useCacheStats(): CacheStats {
  const [stats, setStats] = useState<CacheStats>({ totalSize: 0, itemCount: 0 });

  useEffect(() => {
    const calculateStats = async () => {
      if (!('caches' in window)) return;

      try {
        const cacheNames = await caches.keys();
        let totalSize = 0;
        let itemCount = 0;
        let oldestItem: Date | undefined;

        for (const name of cacheNames) {
          const cache = await caches.open(name);
          const requests = await cache.keys();

          itemCount += requests.length;

          for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
              const blob = await response.clone().blob();
              totalSize += blob.size;

              const dateHeader = response.headers.get('date');
              if (dateHeader) {
                const date = new Date(dateHeader);
                if (!oldestItem || date < oldestItem) {
                  oldestItem = date;
                }
              }
            }
          }
        }

        setStats({ totalSize, itemCount, oldestItem });
      } catch (e) {
        // Ignore errors
      }
    };

    calculateStats();
  }, []);

  return stats;
}

// ==========================================
// Clear Cache Button
// ==========================================

export async function clearAllCaches(): Promise<void> {
  if (!('caches' in window)) return;

  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
  localStorage.clear();
  sessionStorage.clear();
}

// ==========================================
// Network Quality Indicator
// ==========================================

export function useNetworkQuality() {
  const [quality, setQuality] = useState<'slow' | 'fast' | 'unknown'>('unknown');

  useEffect(() => {
    const connection = (navigator as any).connection ||
                       (navigator as any).mozConnection ||
                       (navigator as any).webkitConnection;

    if (!connection) return;

    const updateQuality = () => {
      if (connection.saveData) {
        setQuality('slow');
      } else if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setQuality('slow');
      } else {
        setQuality('fast');
      }
    };

    updateQuality();
    connection.addEventListener('change', updateQuality);

    return () => connection.removeEventListener('change', updateQuality);
  }, []);

  return quality;
}

// ==========================================
// Network Quality Badge
// ==========================================

export function NetworkQualityBadge() {
  const quality = useNetworkQuality();

  if (quality === 'unknown') return null;

  return (
    <div className={`
      flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
      ${quality === 'fast' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}
    `}>
      {quality === 'fast' ? <Wifi size={12} /> : <WifiOff size={12} />}
      {quality === 'fast' ? 'Nhanh' : 'Chậm'}
    </div>
  );
}
