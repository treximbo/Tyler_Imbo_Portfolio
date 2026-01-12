import { useTheme } from "../context/ThemeContext";

export default function About() {
    const { theme } = useTheme();
    
    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
            <h1 
                className="mb-6 md:mb-8"
                style={{
                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                }}
            >
                About Me
            </h1>
        </section>
    );
}
