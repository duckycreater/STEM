// ==========================================
// PlantCare AI — Pull to Refresh & Gesture Support
// ==========================================

import { useState, useRef, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  maxPull?: number;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  maxPull = 120,
}: PullToRefreshProps) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pullY = useMotionValue(0);
  const rotate = useTransform(pullY, [0, maxPull], [0, 180]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling || refreshing) return;
    const touch = e.touches[0];
    const deltaY = Math.max(0, touch.clientY - 100);
    pullY.set(Math.min(deltaY, maxPull));
  }, [pulling, refreshing, pullY, maxPull]);

  const handleTouchEnd = useCallback(async () => {
    if (!pulling || refreshing) return;
    setPulling(false);

    const currentY = pullY.get();
    if (currentY >= threshold) {
      setRefreshing(true);
      pullY.set(threshold);

      try {
        await onRefresh();
      } finally {
        animate(pullY, 0, { type: 'spring', stiffness: 300, damping: 30 });
        setRefreshing(false);
      }
    } else {
      animate(pullY, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [pulling, refreshing, pullY, threshold, onRefresh]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden"
    >
      {/* Pull indicator */}
      <motion.div
        className={cn(
          "absolute left-0 right-0 flex items-center justify-center overflow-hidden",
          refreshing ? "h-16" : "h-0"
        )}
        style={{
          height: refreshing ? undefined : pullY,
          top: 0,
        }}
      >
        <motion.div
          style={{ rotate }}
          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
        >
          <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
          <span className="text-sm font-semibold">
            {refreshing ? "Đang cập nhật..." : "Kéo để làm mới"}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div style={{ transform: pullY.get() > 0 ? `translateY(${pullY.get()}px)` : undefined }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// Swipeable Card Component
// ==========================================

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (offset < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, scale }}
      className="cursor-grab active:cursor-grabbing touch-none select-none"
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// Long Press Component
// ==========================================

interface LongPressProps {
  children: ReactNode;
  onLongPress: () => void;
  duration?: number;
  className?: string;
}

export function LongPress({ children, onLongPress, duration = 500, className }: LongPressProps) {
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setPressing(true);
    timerRef.current = setTimeout(() => {
      onLongPress();
      setPressing(false);
    }, duration);
  };

  const handleEnd = () => {
    setPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className={cn(pressing && "scale-95", className)}
    >
      {children}
    </div>
  );
}

// ==========================================
// Haptic Feedback Hook
// ==========================================

export function useHaptic() {
  const vibrate = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const success = () => vibrate(10);
  const error = () => vibrate([50, 50, 50]);
  const warning = () => vibrate(30);
  const selection = () => vibrate(5);
  const impact = () => vibrate(20);

  return { vibrate, success, error, warning, selection, impact };
}

// ==========================================
// Voice Commands Hook
// ==========================================

interface VoiceCommandsOptions {
  onCommand: (command: string) => void;
  commands?: string[];
  continuous?: boolean;
}

export function useVoiceCommands({ onCommand, commands = [], continuous = false }: VoiceCommandsOptions) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'vi-VN';

    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = () => setListening(false);

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        onCommand(finalTranscript.toLowerCase().trim());
      }
    };

    recognitionRef.current.start();
  }, [commands, onCommand, continuous]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
  };
}

export default PullToRefresh;
