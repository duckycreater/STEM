// ==========================================
// PlantCare AI — Onboarding Wizard
// ==========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Check, Leaf, Camera, Wifi, Sparkles, Globe, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSettings } from '../contexts/SettingsContext';

interface OnboardingStep {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface OnboardingWizardProps {
  onComplete: () => void;
}

const STEPS_VI: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Chào mừng!',
    titleEn: 'Welcome!',
    description: 'PlantCare AI - Ứng dụng chẩn đoán bệnh cây trồng thông minh với AI',
    descriptionEn: 'PlantCare AI - Smart plant disease detection app with AI',
    icon: <Leaf className="w-16 h-16 text-emerald-500" />,
  },
  {
    id: 'camera',
    title: 'Chụp ảnh cây',
    titleEn: 'Take Plant Photos',
    description: 'Chụp hoặc tải lên hình ảnh cây bị bệnh để được AI phân tích ngay lập tức',
    descriptionEn: 'Take or upload photos of diseased plants for instant AI analysis',
    icon: <Camera className="w-16 h-16 text-blue-500" />,
  },
  {
    id: 'offline',
    title: 'Chế độ Offline',
    titleEn: 'Offline Mode',
    description: 'Không có mạng? Không sao! 261 bệnh cây trồng đã có sẵn offline',
    descriptionEn: 'No internet? No problem! 261 plant diseases available offline',
    icon: <Wifi className="w-16 h-16 text-amber-500" />,
  },
  {
    id: 'iot',
    title: 'IoT Dashboard',
    titleEn: 'IoT Dashboard',
    description: 'Theo dõi cảm biến trang trại realtime - nhiệt độ, độ ẩm, pH, NPK',
    descriptionEn: 'Monitor farm sensors in realtime - temperature, humidity, pH, NPK',
    icon: <Sparkles className="w-16 h-16 text-purple-500" />,
  },
  {
    id: 'language',
    title: 'Ngôn ngữ',
    titleEn: 'Language',
    description: 'Hỗ trợ tiếng Việt và English - chuyển đổi dễ dàng',
    descriptionEn: 'Vietnamese and English support - switch easily',
    icon: <Globe className="w-16 h-16 text-teal-500" />,
  },
];

const STEPS_EN: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome!',
    titleEn: 'Welcome!',
    description: 'PlantCare AI - Smart plant disease detection app with AI',
    descriptionEn: 'PlantCare AI - Smart plant disease detection app with AI',
    icon: <Leaf className="w-16 h-16 text-emerald-500" />,
  },
  {
    id: 'camera',
    title: 'Take Plant Photos',
    titleEn: 'Take Plant Photos',
    description: 'Take or upload photos of diseased plants for instant AI analysis',
    descriptionEn: 'Take or upload photos of diseased plants for instant AI analysis',
    icon: <Camera className="w-16 h-16 text-blue-500" />,
  },
  {
    id: 'offline',
    title: 'Offline Mode',
    titleEn: 'Offline Mode',
    description: 'No internet? No problem! 261 plant diseases available offline',
    descriptionEn: 'No internet? No problem! 261 plant diseases available offline',
    icon: <Wifi className="w-16 h-16 text-amber-500" />,
  },
  {
    id: 'iot',
    title: 'IoT Dashboard',
    titleEn: 'IoT Dashboard',
    description: 'Monitor farm sensors in realtime - temperature, humidity, pH, NPK',
    descriptionEn: 'Monitor farm sensors in realtime - temperature, humidity, pH, NPK',
    icon: <Sparkles className="w-16 h-16 text-purple-500" />,
  },
  {
    id: 'language',
    title: 'Language',
    titleEn: 'Language',
    description: 'Vietnamese and English support - switch easily',
    descriptionEn: 'Vietnamese and English support - switch easily',
    icon: <Globe className="w-16 h-16 text-teal-500" />,
  },
];

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { darkMode, setDarkMode } = useSettings();

  const steps = darkMode ? STEPS_VI : STEPS_EN;
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      localStorage.setItem('onboarding_completed', 'true');
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Skip <X size={16} />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: index === currentStep ? 24 : 8,
                backgroundColor: index <= currentStep ? '#10b981' : 'rgba(255,255,255,0.3)',
              }}
              className="h-2 rounded-full"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          ))}
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
            >
              {step.icon}
            </motion.div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3">
            {!isFirstStep && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={18} />
                Back
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                isLastStep
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30"
              )}
            >
              {isLastStep ? (
                <>
                  <Check size={18} />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-white/50 text-xs mt-6">
          🌿 PlantCare AI v2.0 — Smart Agriculture
        </p>
      </div>
    </div>
  );
}

// Hook to check if onboarding needed
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const complete = () => setShowOnboarding(false);

  return { showOnboarding, complete };
}

export default OnboardingWizard;
