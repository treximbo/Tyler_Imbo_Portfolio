import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelemetry } from './TelemetryProvider';

/**
 * Hook to track maximum scroll depth percentage per route (0-100)
 * - Throttles via requestAnimationFrame (no heavy onScroll)
 * - Emits scroll_depth events only when max increases (avoids spamming)
 * - Resets max on route change
 * - Respects disabled state
 * 
 * Call this hook once in app shell/layout
 */
export function useScrollDepth() {
  const location = useLocation();
  const { record, enabled } = useTelemetry();
  
  // Track max scroll depth per route - reset on route change
  const maxScrollDepthRef = useRef(0);
  const routeKeyRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      // Reset when disabled
      maxScrollDepthRef.current = 0;
      routeKeyRef.current = null;
      return;
    }

    // Create route key from pathname + hash (matches useRouteTracking format)
    const routeKey = location.pathname + (location.hash || '');
    
    // Reset max scroll depth when route changes
    if (routeKeyRef.current !== routeKey) {
      maxScrollDepthRef.current = 0;
      routeKeyRef.current = routeKey;
    }

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Calculate scroll depth as percentage (0-100)
          const scrollDepth = Math.min(
            ((scrollTop + windowHeight) / documentHeight) * 100,
            100
          );
          
          // Only emit if this is a new maximum (avoid spamming)
          if (scrollDepth > maxScrollDepthRef.current) {
            maxScrollDepthRef.current = scrollDepth;
            record({
              type: 'scroll_depth',
              route: routeKey,
              depth: scrollDepth,
            });
          }
          
          tickingRef.current = false;
        });
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      tickingRef.current = false;
    };
  }, [location.pathname, location.hash, record, enabled]);
}
