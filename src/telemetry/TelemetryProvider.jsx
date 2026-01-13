import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  isOptedIn,
  setOptIn,
  record,
  reset,
  exportData,
  finalizeSession,
  getAggregatedStats,
} from './telemetryStore';

const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  const [enabled, setEnabled] = useState(() => isOptedIn());
  const [panelOpen, setPanelOpen] = useState(false);
  const [stats, setStats] = useState(() => getAggregatedStats());

  // Initialize session when enabled
  useEffect(() => {
    if (enabled) {
      // Initialize session by recording a session_start event
      record({ type: 'session_start' });
      setStats(getAggregatedStats());
    } else {
      finalizeSession();
    }
  }, [enabled]);

  // Refresh stats periodically when panel is open
  useEffect(() => {
    if (!panelOpen || !enabled) return;
    
    const interval = setInterval(() => {
      setStats(getAggregatedStats());
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [panelOpen, enabled]);

  const setEnabledState = useCallback((newState) => {
    setOptIn(newState);
    setEnabled(newState);
    
    if (newState) {
      record({ type: 'session_start' });
    } else {
      finalizeSession();
    }
    
    setStats(getAggregatedStats());
  }, []);

  const recordEvent = useCallback((event) => {
    if (enabled) {
      record(event);
      setStats(getAggregatedStats());
    }
  }, [enabled]);

  const trackClick = useCallback((label, meta = {}) => {
    if (enabled) {
      record({
        type: 'click',
        label,
        ...meta,
      });
      setStats(getAggregatedStats());
    }
  }, [enabled]);

  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all telemetry data? This cannot be undone.')) {
      reset();
      setStats(getAggregatedStats());
      if (enabled) {
        record({ type: 'session_start' });
      }
    }
  }, [enabled]);

  const handleExport = useCallback(() => {
    return exportData();
  }, []);

  const handleDisable = useCallback(() => {
    finalizeSession();
    setEnabledState(false);
    setPanelOpen(false);
  }, [setEnabledState]);

  const value = {
    enabled,
    setEnabled: setEnabledState,
    panelOpen,
    setPanelOpen,
    stats,
    record: recordEvent,
    trackClick,
    reset: handleReset,
    export: handleExport,
    disableTracking: handleDisable,
    refreshStats: () => setStats(getAggregatedStats()),
  };

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
