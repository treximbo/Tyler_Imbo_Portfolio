import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const root = window.document.documentElement;
        const body = window.document.body;
        
        // Check localStorage first
        const stored = localStorage.getItem('theme');
        if (stored) {
            // Apply immediately - ensure clean state
            root.classList.remove('dark', 'light');
            if (stored === 'dark') {
                root.classList.add('dark');
                root.style.setProperty('background-color', '#0f172a', 'important');
                body.style.setProperty('background-color', '#0f172a', 'important');
            } else {
                // Explicitly ensure dark is removed
                root.classList.remove('dark');
                root.style.setProperty('background-color', '#f8fafc', 'important');
                body.style.setProperty('background-color', '#f8fafc', 'important');
            }
            return stored;
        }
        // Check system preference
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.remove('dark', 'light');
        if (isDark) {
            root.classList.add('dark');
            root.style.setProperty('background-color', '#0f172a', 'important');
            body.style.setProperty('background-color', '#0f172a', 'important');
        } else {
            root.classList.remove('dark');
            root.style.setProperty('background-color', '#f8fafc', 'important');
            body.style.setProperty('background-color', '#f8fafc', 'important');
        }
        return isDark ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const body = window.document.body;
        const rootDiv = window.document.getElementById('root');
        
        // Explicitly set the class based on theme (Tailwind's class-based dark mode)
        if (theme === 'dark') {
            root.classList.remove('light');
            root.classList.add('dark');
            // Backup inline styles for html/body/root elements
            root.style.setProperty('background-color', '#0f172a', 'important'); // slate-900
            body.style.setProperty('background-color', '#0f172a', 'important'); // slate-900
            if (rootDiv) {
                rootDiv.style.setProperty('background-color', '#0f172a', 'important');
            }
        } else {
            root.classList.remove('dark');
            root.classList.remove('light');
            // Backup inline styles for html/body/root elements
            root.style.setProperty('background-color', '#f8fafc', 'important'); // slate-50
            body.style.setProperty('background-color', '#f8fafc', 'important'); // slate-50
            if (rootDiv) {
                rootDiv.style.setProperty('background-color', '#f8fafc', 'important');
            }
        }
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
