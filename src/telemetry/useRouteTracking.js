import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelemetry } from './TelemetryProvider';

/**
 * Hook to track route navigation and time on route
 * - Tracks route_view on navigation (pathname + optional hash)
 * - Tracks route_time when route changes (emits for previous route with duration)
 * - Handles unmount cleanup (best-effort for tab close/refresh)
 * - Does nothing when telemetry is disabled
 * 
 * Call this hook once in the app shell/layout
 */
export function useRouteTracking() {
  const location = useLocation();
  const { record, enabled } = useTelemetry();
  
  // Track current route and start time
  const currentRouteRef = useRef(null);
  const routeStartTimeRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      // Reset refs when disabled
      currentRouteRef.current = null;
      routeStartTimeRef.current = null;
      return;
    }

    // Create route key from pathname + hash
    const routeKey = location.pathname + (location.hash || '');
    const now = Date.now();

    // If we have a previous route, emit route_time event
    if (currentRouteRef.current && routeStartTimeRef.current) {
      const duration = now - routeStartTimeRef.current;
      record({
        type: 'route_time',
        route: currentRouteRef.current,
        durationMs: duration,
      });
    }

    // Record new route_view
    record({
      type: 'route_view',
      route: routeKey,
      pathname: location.pathname,
      hash: location.hash || null,
    });

    // Update refs for next route change
    currentRouteRef.current = routeKey;
    routeStartTimeRef.current = now;
  }, [location.pathname, location.hash, record, enabled]);

  // Cleanup on unmount - emit route_time for current route
  useEffect(() => {
    return () => {
      if (enabled && currentRouteRef.current && routeStartTimeRef.current) {
        const duration = Date.now() - routeStartTimeRef.current;
        record({
          type: 'route_time',
          route: currentRouteRef.current,
          durationMs: duration,
        });
      }
    };
  }, [enabled, record]);

  // Best-effort cleanup on page unload (tab close/refresh)
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => {
      if (currentRouteRef.current && routeStartTimeRef.current) {
        const duration = Date.now() - routeStartTimeRef.current;
        // Use sendBeacon for reliability during page unload
        try {
          const data = JSON.stringify({
            type: 'route_time',
            route: currentRouteRef.current,
            durationMs: duration,
          });
          // Note: This would require a backend endpoint in production
          // For localStorage-only, we'll rely on the cleanup effect
          // which should fire before unload in most cases
        } catch (error) {
          // Silently fail - best effort only
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled]);
}
