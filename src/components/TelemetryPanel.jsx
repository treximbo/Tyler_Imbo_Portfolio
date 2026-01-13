import { useEffect } from 'react';
import { useTelemetry } from '../telemetry/TelemetryProvider';
import { useTheme } from '../context/ThemeContext';

export default function TelemetryPanel() {
  const {
    enabled,
    setEnabled,
    panelOpen,
    setPanelOpen,
    stats,
    reset,
    export: exportData,
    disableTracking,
  } = useTelemetry();
  const { theme } = useTheme();

  // Handle escape key to close
  useEffect(() => {
    if (!panelOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [panelOpen, setPanelOpen]);

  if (!panelOpen) return null;

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatScrollDepth = (depth) => {
    return `${Math.round(depth)}%`;
  };

  const handleExport = () => {
    const jsonData = exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setPanelOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md overflow-y-auto shadow-2xl transition-transform duration-300 ease-out"
        style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderLeft: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="telemetry-panel-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
            }}
          >
            <h2
              id="telemetry-panel-title"
              className="text-xl font-semibold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#0f172a',
              }}
            >
              UX Telemetry
            </h2>
            <button
              onClick={() => setPanelOpen(false)}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-opacity-10 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Close panel"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{
                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6 space-y-6">
            {!enabled ? (
              /* Disabled State - Opt-in UI */
              <div className="space-y-6">
                <div
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                  }}
                >
                  <h3
                    className="mb-3 text-lg font-semibold"
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#0f172a',
                    }}
                  >
                    Local-Only Telemetry
                  </h3>
                  <p
                    className="mb-4 text-sm leading-relaxed"
                    style={{
                      color: theme === 'dark' ? '#e2e8f0' : '#475569',
                    }}
                  >
                    Local-only, stored in your browser, not transmitted.
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: theme === 'dark' ? '#cbd5e1' : '#64748b',
                    }}
                  >
                    This demo tracks route views, time on page, scroll depth, and click interactions. All data stays in your browser's localStorage and is never sent to any server.
                  </p>
                </div>

                <button
                  onClick={() => setEnabled(true)}
                  className="w-full rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#2563eb' : '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
                  }}
                >
                  Enable Tracking
                </button>
              </div>
            ) : (
              /* Enabled State - Dashboard UI */
              <>
                {/* Session Summary */}
                <section>
                  <h3
                    className="mb-4 text-lg font-semibold"
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#0f172a',
                    }}
                  >
                    Session Summary
                  </h3>
                  <div
                    className="grid grid-cols-3 gap-4 rounded-lg p-4"
                    style={{
                      backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                      border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                    }}
                  >
                    <div>
                      <div
                        className="text-xs"
                        style={{
                          color: theme === 'dark' ? '#94a3b8' : '#64748b',
                        }}
                      >
                        Total Time
                      </div>
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                      >
                        {formatTime(stats.totalTime)}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-xs"
                        style={{
                          color: theme === 'dark' ? '#94a3b8' : '#64748b',
                        }}
                      >
                        Routes
                      </div>
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                      >
                        {stats.totalRoutes}
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-xs"
                        style={{
                          color: theme === 'dark' ? '#94a3b8' : '#64748b',
                        }}
                      >
                        Events
                      </div>
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                      >
                        {stats.totalClicks + stats.totalRoutes}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Per-Route Table */}
                {stats.routeStats.length > 0 && (
                  <section>
                    <h3
                      className="mb-4 text-lg font-semibold"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                      }}
                    >
                      Routes
                    </h3>
                    <div
                      className="overflow-hidden rounded-lg border"
                      style={{
                        borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                      }}
                    >
                      <table className="w-full text-sm">
                        <thead>
                          <tr
                            style={{
                              backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                              borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                            }}
                          >
                            <th
                              className="px-4 py-3 text-left font-semibold"
                              style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                              }}
                            >
                              Route
                            </th>
                            <th
                              className="px-4 py-3 text-right font-semibold"
                              style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                              }}
                            >
                              Views
                            </th>
                            <th
                              className="px-4 py-3 text-right font-semibold"
                              style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                              }}
                            >
                              Time
                            </th>
                            <th
                              className="px-4 py-3 text-right font-semibold"
                              style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                              }}
                            >
                              Scroll
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.routeStats.map((route, index) => (
                            <tr
                              key={route.path}
                              style={{
                                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                                borderBottom:
                                  index < stats.routeStats.length - 1
                                    ? `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
                                    : 'none',
                              }}
                            >
                              <td className="px-4 py-3">
                                <code
                                  className="text-xs font-medium"
                                  style={{
                                    color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                                  }}
                                >
                                  {route.path}
                                </code>
                              </td>
                              <td
                                className="px-4 py-3 text-right"
                                style={{
                                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                                }}
                              >
                                {route.views}
                              </td>
                              <td
                                className="px-4 py-3 text-right"
                                style={{
                                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                                }}
                              >
                                {formatTime(route.avgTime)}
                              </td>
                              <td
                                className="px-4 py-3 text-right"
                                style={{
                                  color: theme === 'dark' ? '#e2e8f0' : '#334155',
                                }}
                              >
                                {formatScrollDepth(route.maxScrollDepth)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Top Clicks */}
                {stats.topClicks.length > 0 && (
                  <section>
                    <h3
                      className="mb-4 text-lg font-semibold"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                      }}
                    >
                      Top Clicks
                    </h3>
                    <div className="space-y-2">
                      {stats.topClicks.map((click, index) => (
                        <div
                          key={click.label}
                          className="flex items-center justify-between rounded-lg p-3"
                          style={{
                            backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                              }}
                            >
                              {index + 1}
                            </span>
                            <span
                              className="text-sm font-medium"
                              style={{
                                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                              }}
                            >
                              {click.label}
                            </span>
                          </div>
                          <span
                            className="text-sm font-semibold"
                            style={{
                              color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                            }}
                          >
                            {click.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Empty State */}
                {stats.totalSessions === 0 && (
                  <div
                    className="rounded-lg p-8 text-center"
                    style={{
                      backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                      border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                    }}
                  >
                    <p
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#94a3b8' : '#64748b',
                      }}
                    >
                      No telemetry data yet. Navigate around the site to start tracking.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Actions */}
          {enabled && (
            <div
              className="sticky bottom-0 border-t px-6 py-4 space-y-3 backdrop-blur-sm"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
              }}
            >
              <button
                onClick={handleExport}
                className="w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                style={{
                  backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme === 'dark' ? '#2563eb' : '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
                }}
              >
                Export JSON
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={reset}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#334155',
                    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#ffffff';
                  }}
                >
                  Reset Data
                </button>
                <button
                  onClick={disableTracking}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  style={{
                    backgroundColor: theme === 'dark' ? '#dc2626' : '#ef4444',
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#b91c1c' : '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#dc2626' : '#ef4444';
                  }}
                >
                  Disable
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
