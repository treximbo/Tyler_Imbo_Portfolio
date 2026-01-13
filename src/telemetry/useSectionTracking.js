import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelemetry } from './TelemetryProvider';

/**
 * Hook to track time-in-section using IntersectionObserver
 * Only tracks sections that are opt-in (case study pages)
 * 
 * @param {string[]} sectionIds - Array of section IDs to track (e.g., ['context', 'constraints', 'implementation', 'results'])
 * @param {Object} options - Options for IntersectionObserver
 */
export function useSectionTracking(sectionIds = [], options = {}) {
  const location = useLocation();
  const { record, enabled } = useTelemetry();
  
  // Track active sections and their start times
  const activeSectionsRef = useRef(new Map());
  const observerRef = useRef(null);

  useEffect(() => {
    // Do nothing if telemetry is disabled or no sections to track
    if (!enabled || sectionIds.length === 0) {
      return;
    }

    // Create route key from pathname + hash
    const routeKey = location.pathname + (location.hash || '');

    // IntersectionObserver options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // Section is considered visible when 50% is in viewport
      ...options,
    };

    // Callback for IntersectionObserver
    const handleIntersection = (entries) => {
      const now = Date.now();

      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (!sectionId || !sectionIds.includes(sectionId)) return;

        if (entry.isIntersecting) {
          // Section entered viewport - start timing
          if (!activeSectionsRef.current.has(sectionId)) {
            activeSectionsRef.current.set(sectionId, now);
          }
        } else {
          // Section left viewport - stop timing and emit event
          const startTime = activeSectionsRef.current.get(sectionId);
          if (startTime) {
            const duration = now - startTime;
            if (duration > 0) {
              record({
                type: 'section_time',
                route: routeKey,
                sectionId,
                durationMs: duration,
              });
            }
            activeSectionsRef.current.delete(sectionId);
          }
        }
      });
    };

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup: emit final times for any active sections
    return () => {
      const now = Date.now();
      activeSectionsRef.current.forEach((startTime, sectionId) => {
        const duration = now - startTime;
        if (duration > 0) {
          record({
            type: 'section_time',
            route: routeKey,
            sectionId,
            durationMs: duration,
          });
        }
      });
      activeSectionsRef.current.clear();

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [enabled, sectionIds.join(','), location.pathname, location.hash, record]);
}
