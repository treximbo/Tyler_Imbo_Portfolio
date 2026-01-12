import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <label 
            className="cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <input 
                type="checkbox" 
                checked={isDark}
                onChange={toggleTheme}
                className="sr-only"
                aria-hidden="true"
            />
            <div 
                className="relative h-10 w-20 rounded-full transition-all duration-300 ease-in-out"
                style={{
                    backgroundColor: isDark ? '#374151' : '#eff6ff', // blue-50 in light mode
                    border: `3px solid ${isDark ? '#4b5563' : '#bfdbfe'}`, // blue-200 border in light mode
                    boxShadow: isDark 
                        ? '0px 4px 12px rgba(0, 0, 0, 0.3)' 
                        : '0px 4px 12px rgba(29, 78, 216, 0.15)', // blue shadow in light mode
                }}
            >
                {/* Sun Icon (Light Mode) - Left side */}
                <div
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                        width: '24px',
                        height: '24px',
                        left: '8px',
                        top: '50%',
                        transform: `translateY(-50%) ${isDark ? 'scale(0) rotate(0deg)' : 'scale(1) rotate(15deg)'}`,
                        opacity: isDark ? 0 : 1,
                    }}
                >
                    <svg
                        className="w-full h-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: '#1d4ed8' }} // blue-700 to match nav hover text
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </div>

                {/* Moon Icon (Dark Mode) - Right side */}
                <div
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                        width: '24px',
                        height: '24px',
                        right: '8px',
                        top: '50%',
                        transform: `translateY(-50%) ${isDark ? 'scale(1) rotate(-15deg)' : 'scale(0) rotate(0deg)'}`,
                        opacity: isDark ? 1 : 0,
                    }}
                >
                    <svg
                        className="w-full h-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: '#ffffff' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                </div>

                {/* Toggle Button - Opposite side of active icon */}
                <div
                    className="absolute rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: '26px',
                        height: '26px',
                        top: '50%',
                        left: isDark ? '4px' : 'calc(100% - 30px)', // Left when dark (moon visible), right when light (sun visible)
                        transform: 'translateY(-50%)',
                        backgroundColor: 'transparent',
                        boxShadow: isDark 
                            ? 'inset 0 0 0 3px #ffffff' 
                            : 'inset 0 0 0 3px #1d4ed8', // blue-700 border in light mode
                    }}
                />
            </div>
        </label>
    );
}
