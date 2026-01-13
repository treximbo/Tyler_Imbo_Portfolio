import { Outlet, Link } from "react-router-dom";
import Navigation from "./Navigation";
import DarkModeToggle from "./DarkModeToggle";
import TelemetryToggle from "./TelemetryToggle";
import TelemetryPanel from "./TelemetryPanel";
import { useTheme } from "../context/ThemeContext";
import { useTelemetry } from "../telemetry/TelemetryProvider";
import { useRouteTracking } from "../telemetry/useRouteTracking";
import { useScrollDepth } from "../telemetry/useScrollDepth";

export default function MainLayout() {
    const { theme } = useTheme();
    const { trackClick } = useTelemetry();
    useRouteTracking();
    useScrollDepth();
    
    // Backup inline styles if Tailwind dark mode isn't working
    const backgroundColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
    const textColor = theme === 'dark' ? '#ffffff' : '#0f172a';
    
    return (
        <div 
            className="min-h-screen h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            <header 
                className="sticky top-0 z-50 border-b backdrop-blur-md shadow-sm transition-colors duration-300"
                style={{
                    borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                    backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.9)', // slate-800 in dark mode (lighter than body)
                }}
            >
                <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)]">
                    <div className="flex items-center justify-between py-4 md:py-5">
                        <Link 
                            to="/"
                            onClick={() => trackClick('Nav: Home Logo')}
                            className="text-xl md:text-2xl font-bold hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                            style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = theme === 'dark' ? '#60a5fa' : '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = theme === 'dark' ? '#ffffff' : '#0f172a';
                            }}
                        >
                            TRexDev
                        </Link>
                        <div className="flex items-center gap-4">
                            <Navigation />
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <TelemetryPanel />
            <TelemetryToggle />

            <footer 
                className="border-t py-8 transition-colors duration-300"
                style={{
                    borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                }}
            >
                <div 
                    className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] text-xs"
                    style={{
                        color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    }}
                >
                    © {new Date().getFullYear()} Tyler Imbo
                </div>
            </footer>
        </div>
    );
}
