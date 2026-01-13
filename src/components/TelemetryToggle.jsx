import { useTelemetry } from '../telemetry/TelemetryProvider';
import { useTheme } from '../context/ThemeContext';

/**
 * Floating button to open telemetry panel
 * Visible on all pages, positioned fixed bottom-left
 */
export default function TelemetryToggle() {
  const { enabled, panelOpen, setPanelOpen } = useTelemetry();
  const { theme } = useTheme();

  const handleClick = () => {
    setPanelOpen(true);
  };

  // Don't show if panel is already open
  if (panelOpen) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      style={{
        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        color: theme === 'dark' ? '#e2e8f0' : '#334155',
        border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
        boxShadow: theme === 'dark'
          ? '0 10px 25px rgba(0, 0, 0, 0.3)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc';
        e.target.style.borderColor = theme === 'dark' ? '#64748b' : '#cbd5e1';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = theme === 'dark'
          ? '0 12px 30px rgba(0, 0, 0, 0.4)'
          : '0 12px 30px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#ffffff';
        e.target.style.borderColor = theme === 'dark' ? '#475569' : '#cbd5e1';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = theme === 'dark'
          ? '0 10px 25px rgba(0, 0, 0, 0.3)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)';
      }}
      aria-label="Open UX Telemetry panel"
      title="UX Telemetry"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <span className="text-sm font-medium">UX Telemetry</span>
      {enabled && (
        <span
          className="ml-1 h-2 w-2 rounded-full"
          style={{
            backgroundColor: '#10b981',
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
