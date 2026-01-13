/**
 * Telemetry Store - Local-only tracking via localStorage
 * Uses append-only events[] array with derived rollups
 */

const STORAGE_KEY = 'ux_telemetry_data';
const OPT_IN_KEY = 'ux_telemetry_opt_in';

/**
 * Get telemetry data from localStorage
 */
function load() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      sessions: [],
      currentSession: null,
      totalSessions: 0,
    };
  } catch (error) {
    console.error('Error reading telemetry data:', error);
    return {
      sessions: [],
      currentSession: null,
      totalSessions: 0,
    };
  }
}

/**
 * Save telemetry data to localStorage
 */
function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving telemetry data:', error);
  }
}

/**
 * Check if user has opted in
 */
export function isOptedIn() {
  try {
    return localStorage.getItem(OPT_IN_KEY) === 'true';
  } catch (error) {
    return false;
  }
}

/**
 * Set opt-in status
 */
export function setOptIn(status) {
  try {
    localStorage.setItem(OPT_IN_KEY, String(status));
  } catch (error) {
    console.error('Error setting opt-in status:', error);
  }
}

/**
 * Initialize a new session
 */
function initializeSession() {
  const data = load();
  const sessionId = `session_${Date.now()}`;
  const session = {
    id: sessionId,
    startedAt: Date.now(),
    events: [], // Append-only event log
  };
  
  data.currentSession = session;
  data.totalSessions = (data.totalSessions || 0) + 1;
  save(data);
  
  return session;
}

/**
 * Get or create current session
 */
function getCurrentSession() {
  const data = load();
  if (!data.currentSession) {
    initializeSession();
    return load().currentSession;
  }
  // Ensure session has events array (handle legacy data)
  if (!data.currentSession.events || !Array.isArray(data.currentSession.events)) {
    data.currentSession.events = [];
    save(data);
  }
  return data.currentSession;
}

/**
 * Append event to current session's events array
 * Generic record() method - accepts any event object
 */
export function record(event) {
  if (!isOptedIn()) return;
  
  const session = getCurrentSession();
  if (!session) return;
  
  const eventEntry = {
    ...event,
    timestamp: Date.now(),
  };
  
  session.events.push(eventEntry);
  
  const data = load();
  data.currentSession = session;
  save(data);
}

/**
 * Reset all telemetry data
 */
export function reset() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting telemetry data:', error);
    return false;
  }
}

/**
 * Export telemetry data as JSON
 */
export function exportData() {
  const data = load();
  return JSON.stringify(data, null, 2);
}

/**
 * Finalize current session (move to sessions array)
 */
export function finalizeSession() {
  if (!isOptedIn()) return;
  
  const data = load();
  const session = data.currentSession;
  
  if (!session) return;
  
  // Move to sessions array (keep last 50 sessions)
  if (!data.sessions) {
    data.sessions = [];
  }
  data.sessions.push(session);
  if (data.sessions.length > 50) {
    data.sessions = data.sessions.slice(-50);
  }
  
  data.currentSession = null;
  save(data);
}

/**
 * Get rollups (derived statistics from events[])
 * Returns: routes (views/timeMs/maxScrollPct), clicks (counts)
 * Format: routes[routeKey] => { views, timeMs, maxScrollPct }
 */
export function getRollups() {
  const data = load();
  const allSessions = [...(data.sessions || []), ...(data.currentSession ? [data.currentSession] : [])];
  
  if (allSessions.length === 0) {
    return {
      routes: {},
      clicks: {},
      sections: {},
    };
  }
  
  const routes = {}; // routeKey -> { views, timeMs, maxScrollPct }
  const clicks = {}; // label -> count
  const sections = {}; // routeKey -> { sectionId -> timeMs }
  
  allSessions.forEach(session => {
    // Skip sessions without events array (legacy data or corrupted)
    if (!session.events || !Array.isArray(session.events)) {
      return;
    }
    
    let currentRoute = null;
    
    session.events.forEach(event => {
      // Route view events - increment view count
      if (event.type === 'route_view') {
        const routeKey = event.route || (event.pathname + (event.hash || ''));
        currentRoute = routeKey;
        
        if (!routes[routeKey]) {
          routes[routeKey] = { views: 0, timeMs: 0, maxScrollPct: 0 };
        }
        routes[routeKey].views += 1;
      }
      
      // Route time events - accumulate time spent
      if (event.type === 'route_time') {
        const routeKey = event.route;
        if (!routes[routeKey]) {
          routes[routeKey] = { views: 0, timeMs: 0, maxScrollPct: 0 };
        }
        routes[routeKey].timeMs += event.durationMs || 0;
      }
      
      // Scroll depth events - track max scroll percentage
      if (event.type === 'scroll_depth') {
        // Use route from event if available, otherwise fall back to currentRoute
        const routeKey = event.route || currentRoute;
        if (routeKey) {
          if (!routes[routeKey]) {
            routes[routeKey] = { views: 0, timeMs: 0, maxScrollPct: 0 };
          }
          const scrollPct = event.depth || 0;
          if (scrollPct > routes[routeKey].maxScrollPct) {
            routes[routeKey].maxScrollPct = scrollPct;
          }
        }
      }
      
      // Click events
      if (event.type === 'click') {
        const label = event.label || 'Unlabeled';
        clicks[label] = (clicks[label] || 0) + 1;
      }
      
      // Section time events - track time per route + section
      if (event.type === 'section_time') {
        const routeKey = event.route;
        const sectionId = event.sectionId;
        if (routeKey && sectionId) {
          if (!sections[routeKey]) {
            sections[routeKey] = {};
          }
          if (!sections[routeKey][sectionId]) {
            sections[routeKey][sectionId] = 0;
          }
          sections[routeKey][sectionId] += event.durationMs || 0;
        }
      }
    });
  });
  
  return { routes, clicks, sections };
}

/**
 * Get aggregated stats (for UI display)
 */
export function getAggregatedStats() {
  const data = load();
  const allSessions = [...(data.sessions || []), ...(data.currentSession ? [data.currentSession] : [])];
  const { routes, clicks } = getRollups();
  
  const routeStats = Object.entries(routes).map(([routeKey, stats]) => ({
    path: routeKey,
    views: stats.views,
    totalTime: stats.timeMs,
    avgTime: stats.views > 0 ? Math.round(stats.timeMs / stats.views) : 0,
    maxScrollDepth: stats.maxScrollPct,
  }));
  
  const topClicks = Object.entries(clicks)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const totalClicks = Object.values(clicks).reduce((sum, count) => sum + count, 0);
  const totalTime = routeStats.reduce((sum, r) => sum + r.totalTime, 0);
  
  return {
    totalSessions: allSessions.length,
    totalRoutes: routeStats.length,
    totalClicks,
    totalTime,
    routeStats,
    topClicks,
  };
}
