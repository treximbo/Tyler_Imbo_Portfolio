import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelemetry } from './TelemetryProvider';

/**
 * Hook to track scroll depth for the current route
 * Call this hook in route components to track scroll depth
 */
export function useScrollTracking() {
  const location = useLocation();
  const { record, enabled } = useTelemetry();

  useEffect(() => {
    if (!enabled) return;

    // Create route key from pathname + hash (matches useRouteTracking format)
    const routeKey = location.pathname + (location.hash || '');
    
    let ticking = false;
    let maxScrollDepth = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Calculate scroll depth as percentage
          const scrollDepth = ((scrollTop + windowHeight) / documentHeight) * 100;
          
          // Track if this is a new maximum
          if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            record({ 
              type: 'scroll_depth',
              route: routeKey,
              depth: Math.min(scrollDepth, 100) // Cap at 100%
            });
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reset max scroll depth when route changes
    maxScrollDepth = 0;
    
    // Also check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.hash, record, enabled]);
}
