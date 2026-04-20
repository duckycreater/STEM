// ==========================================
// PlantCare AI — Custom Hooks
// ==========================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import type { DiagnosisResult, HistoryItem, ChatMessage } from '../types';

// Hook: Quản lý lịch sử chẩn đoán
export function useDiagnosisHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('plantcare_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, []);

  const addItem = useCallback((item: HistoryItem) => {
    setHistory(prev => {
      const updated = [item, ...prev].slice(0, 50);
      localStorage.setItem('plantcare_history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('plantcare_history');
  }, []);

  const deleteItem = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem('plantcare_history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { history, addItem, clearHistory, deleteItem };
}

// Hook: Quản lý trạng thái online/offline
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Hook: Debounce search
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Hook: Quản lý voice recording với Waveform visualization
export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Timer
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    setAudioBlob(null);
    setDuration(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    isRecording,
    audioBlob,
    duration,
    startRecording,
    stopRecording,
    reset,
  };
}

// Hook: Async action với loading & error states
export function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: false, error: null });

  const execute = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState(s => ({ ...s, loading: false, error: error as Error }));
      throw error;
    }
  }, deps);

  return { ...state, execute, setState };
}

// Hook: Local storage với sync
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Hook: Detect mobile/tablet/desktop
export function useDevice() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}

// Hook: Intersection Observer cho lazy loading
export function useInView(options?: IntersectionObserverInit) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.root]);

  return [setRef, inView] as const;
}

// Hook: Throttled function
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);

  return useCallback((...args: Parameters<T>) => {
    if (Date.now() - lastRun.current >= delay) {
      fn(...args);
      lastRun.current = Date.now();
    }
  }, [fn, delay]) as T;
}

// Hook: Previous value
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default {
  useDiagnosisHistory,
  useOnlineStatus,
  useDebounce,
  useVoiceRecorder,
  useAsync,
  useLocalStorage,
  useDevice,
  useInView,
  useThrottle,
  usePrevious,
};
