import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelemetry } from '../telemetry/TelemetryProvider';

/**
 * Component to track route changes
 * Should be placed in App.jsx to track all route navigation
 */
export default function RouteTracker() {
  const location = useLocation();
  const { record } = useTelemetry();

  useEffect(() => {
    record({ type: 'route_view', path: location.pathname });
  }, [location.pathname, record]);

  return null;
}
