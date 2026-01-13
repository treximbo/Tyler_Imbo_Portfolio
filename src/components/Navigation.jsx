import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTelemetry } from "../telemetry/TelemetryProvider";

function NavItem({to, children}) {
    const { theme } = useTheme();
    const { trackClick } = useTelemetry();
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <NavLink
        to={to}
        onClick={() => trackClick(`Nav: ${children}`)}
        className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
        style={{
            backgroundColor: isActive ? (theme === 'dark' ? '#3b82f6' : '#2563eb') : 'transparent',
            color: isActive ? '#ffffff' : (theme === 'dark' ? '#e2e8f0' : '#334155'),
        }}
        onMouseEnter={(e) => {
            if (!isActive) {
                e.target.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#eff6ff';
                e.target.style.color = theme === 'dark' ? '#60a5fa' : '#1d4ed8';
            }
        }}
        onMouseLeave={(e) => {
            if (!isActive) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#334155';
            }
        }}
        >
            {children}
        </NavLink>
    );
}

export default function Navigation() {
 return (
    <nav className="flex gap-2">
        <NavItem to="/projects">Projects</NavItem>
        <NavItem to="/about">About Me</NavItem>
        <NavItem to="/resume">Resume</NavItem>
    </nav>
 );
}
