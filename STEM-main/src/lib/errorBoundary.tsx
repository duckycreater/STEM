// ==========================================
// PlantCare AI — Error Boundary & Logging
// ==========================================

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Bug, Mail, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error Boundary caught an error:', error, errorInfo);

    // Log to external service (optional)
    this.logErrorToService(error, errorInfo);

    // Call custom onError handler
    this.props.onError?.(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Send to backend logging endpoint
    fetch('/api/log/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    }).catch(() => {
      // Silent fail for logging
    });

    // Also log to console for dev
    console.group('🐛 Error Report');
    console.error('Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('URL:', window.location.href);
    console.groupEnd();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 text-center"
          >
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We encountered an unexpected error. Don't worry, we've logged it and will look into it.
            </p>

            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 mb-2">
                  Technical Details
                </summary>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={this.handleReset}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25"
              >
                <RefreshCw size={18} />
                Refresh Page
              </motion.button>

              <div className="flex gap-2">
                <a
                  href="https://github.com/your-repo/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Github size={16} />
                  Report Issue
                </a>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-6">
              Error ID: {Math.random().toString(36).substr(2, 9)}
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ==========================================
// Logger Utility
// ==========================================

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

class Logger {
  private currentLevel: LogLevel;
  private logs: Array<{ level: LogLevel; message: string; data?: any; timestamp: string }> = [];

  constructor(level: LogLevel = 'debug') {
    this.currentLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
  }

  private format(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logEntry = { level, message, data, timestamp };

    // Store in memory
    this.logs.push(logEntry);

    // Console output with colors
    const colors: Record<LogLevel, string> = {
      debug: 'color: #6b7280', // gray
      info: 'color: #3b82f6', // blue
      warn: 'color: #f59e0b', // amber
      error: 'color: #ef4444', // red
      fatal: 'color: #dc2626', // dark red
    };

    console.log(
      `%c[${timestamp}] [${level.toUpperCase()}]`,
      colors[level],
      message,
      data || ''
    );

    // Send to server in production
    if (import.meta.env.PROD && level >= 'warn') {
      this.sendToServer(logEntry);
    }
  }

  private async sendToServer(logEntry: any): Promise<void> {
    try {
      await fetch('/api/log/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry),
      });
    } catch {
      // Silent fail
    }
  }

  debug(message: string, data?: any) { this.format('debug', message, data); }
  info(message: string, data?: any) { this.format('info', message, data); }
  warn(message: string, data?: any) { this.format('warn', message, data); }
  error(message: string, data?: any) { this.format('error', message, data); }
  fatal(message: string, data?: any) { this.format('fatal', message, data); }

  getLogs(): Array<{ level: LogLevel; message: string; data?: any; timestamp: string }> {
    return [...this.logs];
  }

  clear(): void {
    this.logs = [];
  }
}

export const logger = new Logger(
  import.meta.env.DEV ? 'debug' : 'warn'
);

// ==========================================
// Error Handler Hook
// ==========================================

export function useErrorHandler() {
  return (error: Error, context?: string) => {
    logger.error(`${context ? `[${context}] ` : ''}${error.message}`, {
      stack: error.stack,
      context,
      url: window.location.href,
    });

    // Show user-friendly toast (would need toast library)
    console.error('🚨 Error:', error);
  };
}

// ==========================================
// Performance Monitor
// ==========================================

export class PerformanceMonitor {
  private measurements: Map<string, PerformanceEntry[]> = new Map();

  mark(name: string): void {
    if (import.meta.env.DEV) {
      performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark: string = 'measure_end'): void {
    if (import.meta.env.DEV) {
      performance.mark(endMark);
      performance.measure(name, startMark, endMark);
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
    }
  }

  async trackMetric(name: string, value: number, unit: string = 'ms'): Promise<void> {
    if ('metrics' in navigator && 'PerformanceObserver' in window) {
      try {
        await navigator.sendBeacon('/api/metrics', JSON.stringify({ name, value, unit }));
      } catch {
        // Silent fail
      }
    }
  }

  reportWebVitals(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          logger.info(`Web Vital: ${entry.name}`, {
            value: entry.startTime,
            rating: this.getRating(entry.name, entry.startTime),
          });
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
    }
  }

  private getRating(name: string, value: number): string {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      'largest-contentful-paint': { good: 2500, needsImprovement: 4000 },
      'first-input': { good: 100, needsImprovement: 300 },
      'layout-shift': { good: 0.1, needsImprovement: 0.25 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }
}

export const perfMonitor = new PerformanceMonitor();

// Initialize performance monitoring
if (import.meta.env.PROD) {
  perfMonitor.reportWebVitals();
}

// ==========================================
// Export default error handler
// ==========================================

export function initErrorHandling(): void {
  // Global error handler
  window.addEventListener('error', (event) => {
    logger.error('Global error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Unhandled promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection:', {
      reason: event.reason,
    });
  });

  // Performance timing
  window.addEventListener('load', () => {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    logger.info(`Page load time: ${loadTime}ms`);
  });
}
