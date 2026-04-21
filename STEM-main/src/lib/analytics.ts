// ==========================================
// PlantCare AI — Analytics & Crash Reporting
// ==========================================

// ==========================================
// Analytics Events
// ==========================================

interface EventProps {
  [key: string]: string | number | boolean | undefined;
}

class Analytics {
  private queue: Array<{ event: string; props: EventProps; timestamp: number }> = [];
  private enabled: boolean;

  constructor() {
    this.enabled = import.meta.env.PROD;
    this.flushOnVisibilityChange();
  }

  // Track event
  track(event: string, props: EventProps = {}) {
    if (!this.enabled) {
      console.log(`📊 [Analytics] ${event}`, props);
      return;
    }

    this.queue.push({
      event,
      props,
      timestamp: Date.now(),
    });

    // Send immediately in production
    if (import.meta.env.PROD) {
      this.flush();
    }
  }

  // Screen view
  screen(name: string, props: EventProps = {}) {
    this.track('screen_view', { screen_name: name, ...props });
  }

  // User actions
  tap(element: string, props: EventProps = {}) {
    this.track('tap', { element, ...props });
  }

  // Diagnosis
  diagnosisStart(plantType?: string) {
    this.track('diagnosis_start', { plant_type: plantType });
  }

  diagnosisComplete(diseaseName: string, success: boolean, duration: number) {
    this.track('diagnosis_complete', {
      disease_name: diseaseName,
      success,
      duration_ms: duration,
    });
  }

  diagnosisError(error: string) {
    this.track('diagnosis_error', { error });
  }

  // Chat
  chatSend(hasImage: boolean) {
    this.track('chat_send', { has_image: hasImage });
  }

  chatResponse(duration: number) {
    this.track('chat_response', { duration_ms: duration });
  }

  // Settings
  settingsChange(setting: string, value: string | boolean) {
    this.track('settings_change', { setting, value });
  }

  // Navigation
  navigation(from: string, to: string) {
    this.track('navigation', { from, to });
  }

  // Language change
  languageChange(language: string) {
    this.track('language_change', { language });
  }

  // Offline mode
  offlineMode(enabled: boolean) {
    this.track('offline_mode', { enabled });
  }

  // Flush queue to server
  async flush() {
    if (!this.queue.length) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
        keepalive: true,
      });
    } catch (error) {
      // Re-add to queue on failure
      this.queue.unshift(...events);
    }
  }

  // Flush on page visibility change
  private flushOnVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });

    // Flush before unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }
}

export const analytics = new Analytics();

// ==========================================
// Performance Monitor
// ==========================================

class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  mark(name: string) {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string, endMark?: string) {
    const start = this.marks.get(startMark) || 0;
    const end = endMark ? (this.marks.get(endMark) || performance.now()) : performance.now();
    const duration = end - start;

    // Send to analytics
    analytics.track('performance_measure', {
      name,
      duration_ms: Math.round(duration),
    });

    return duration;
  }

  // Report Core Web Vitals
  reportWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      analytics.track('webvital', {
        name: 'LCP',
        value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
        rating: this.getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
      });
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as any;
      analytics.track('webvital', {
        name: 'FID',
        value: Math.round(firstEntry.processingStart - firstEntry.startTime),
        rating: this.getRating('FID', firstEntry.processingStart - firstEntry.startTime),
      });
    }).observe({ type: 'first-input', buffered: true });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          analytics.track('webvital', {
            name: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            rating: this.getRating('CLS', clsValue),
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }

  private getRating(name: string, value: number): string {
    const thresholds: Record<string, [number, number]> = {
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
    };

    const threshold = thresholds[name];
    if (!threshold) return 'unknown';

    if (value <= threshold[0]) return 'good';
    if (value <= threshold[1]) return 'needs-improvement';
    return 'poor';
  }
}

export const perfMonitor = new PerformanceMonitor();

// ==========================================
// Crash Reporter
// ==========================================

class CrashReporter {
  private errors: Array<{
    message: string;
    stack?: string;
    timestamp: number;
    userAgent: string;
    url: string;
  }> = [];

  constructor() {
    // Listen for errors
    window.addEventListener('error', (event) => {
      this.report({
        message: event.message,
        stack: event.error?.stack,
      });
    });

    // Listen for unhandled rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.report({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
      });
    });

    // Flush on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });
  }

  report(error: { message: string; stack?: string }) {
    this.errors.push({
      ...error,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });

    console.error('🚨 [Crash Reporter]', error.message, error.stack);

    // Auto-flush if too many errors
    if (this.errors.length >= 10) {
      this.flush();
    }
  }

  async flush() {
    if (!this.errors.length) return;

    const errors = [...this.errors];
    this.errors = [];

    try {
      await fetch('/api/logs/crash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errors }),
        keepalive: true,
      });
    } catch (error) {
      console.error('Failed to report crashes:', error);
      this.errors.unshift(...errors);
    }
  }
}

export const crashReporter = new CrashReporter();

// ==========================================
// Initialize Monitoring
// ==========================================

export function initMonitoring() {
  if (import.meta.env.PROD) {
    perfMonitor.reportWebVitals();
    console.log('📊 [Analytics] Monitoring initialized');
  }
}

// ==========================================
// User Session
// ==========================================

interface Session {
  id: string;
  startTime: number;
  pageViews: number;
  events: number;
}

class SessionManager {
  private session: Session;

  constructor() {
    this.session = {
      id: this.generateId(),
      startTime: Date.now(),
      pageViews: 0,
      events: 0,
    };

    // Track page views
    this.trackPageView();

    // Track on history change (for SPAs)
    if ('navigation' in window) {
      (window as any).navigation?.addEventListener('navigate', () => {
        this.trackPageView();
      });
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  trackPageView() {
    this.session.pageViews++;
    analytics.screen(window.location.pathname);
  }

  trackEvent() {
    this.session.events++;
  }

  getSession(): Session {
    return { ...this.session };
  }

  getDuration(): number {
    return Date.now() - this.session.startTime;
  }
}

export const sessionManager = new SessionManager();
