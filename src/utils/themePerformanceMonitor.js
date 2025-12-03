/**
 * Theme Performance Monitor - Track theme switching performance
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

class ThemePerformanceMonitor {
  constructor() {
    this.measurements = [];
    this.isEnabled = process.env.NODE_ENV === 'development';
    
    if (this.isEnabled) {
      this.initializeListeners();
    }
  }

  initializeListeners() {
    // SSR guard - only initialize listeners in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Listen for theme changes
    window.addEventListener('theme-changed', (event) => {
      this.measureThemeSwitch('theme', event.detail?.theme);
    });

    // Listen for palette changes
    window.addEventListener('palette-changed', (event) => {
      this.measureThemeSwitch('palette', event.detail?.palette);
    });
  }

  measureThemeSwitch(type, value) {
    // SSR guard
    if (!this.isEnabled || typeof window === 'undefined' || typeof performance === 'undefined') {
      return;
    }

    const startTime = performance.now();

    // Use requestAnimationFrame to measure when the visual change is complete
    requestAnimationFrame(() => {
      // Wait for another frame to ensure CSS has been applied
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        const measurement = {
          type,
          value,
          duration,
          timestamp: new Date().toISOString(),
        };

        this.measurements.push(measurement);

        // Keep only last 50 measurements
        if (this.measurements.length > 50) {
          this.measurements.shift();
        }

        // Log if it takes too long
        if (duration > 100) {
          console.warn(`Slow ${type} switch detected:`, measurement);
        } else {
          console.log(`${type} switch performance:`, `${duration.toFixed(2)}ms`);
        }
      });
    });
  }

  getStatistics() {
    if (!this.isEnabled || this.measurements.length === 0) {
      return null;
    }

    const durations = this.measurements.map(m => m.duration);
    const average = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    
    return {
      totalMeasurements: this.measurements.length,
      averageDuration: average.toFixed(2),
      minDuration: min.toFixed(2),
      maxDuration: max.toFixed(2),
      recentMeasurements: this.measurements.slice(-10),
    };
  }

  logStatistics() {
    if (!this.isEnabled) return;

    const stats = this.getStatistics();
    if (stats) {
      console.group('Theme Performance Statistics');
      console.log('Total measurements:', stats.totalMeasurements);
      console.log('Average duration:', stats.averageDuration + 'ms');
      console.log('Min duration:', stats.minDuration + 'ms');
      console.log('Max duration:', stats.maxDuration + 'ms');
      console.log('Recent measurements:', stats.recentMeasurements);
      console.groupEnd();
    }
  }

  reset() {
    this.measurements = [];
  }
}

// Create a singleton instance
const themePerformanceMonitor = new ThemePerformanceMonitor();

// Export methods
export const getThemePerformanceStats = () => themePerformanceMonitor.getStatistics();
export const logThemePerformanceStats = () => themePerformanceMonitor.logStatistics();
export const resetThemePerformanceStats = () => themePerformanceMonitor.reset();

// Export the monitor instance for advanced usage
export default themePerformanceMonitor;
