import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700"
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
            <Leaf className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-yellow-900" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-white tracking-tight mb-2"
        >
          PlantCare AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-100/80 text-sm font-medium mb-12"
        >
          Smart Plant Disease Detection
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ delay: 0.7 }}
          className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
          style={{ width: 200 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white to-emerald-200 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-emerald-100/50 text-xs mt-4 font-medium"
        >
          Powered by AI & IoT
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
