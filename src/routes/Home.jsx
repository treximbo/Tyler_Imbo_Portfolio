import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
    const { theme } = useTheme();
    
    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
                {/* Hero Heading with Gradient */}
                <h1 className="mb-6 heading-balance">
                    <span className="text-gradient">Tyler Rex Imbo</span>
                </h1>

                {/* Professional Tagline */}
                <p 
                    className="mb-4 text-xl md:text-2xl font-medium leading-relaxed"
                    style={{
                        color: theme === 'dark' ? '#ffffff' : '#334155',
                    }}
                >
                    Lead Front-End Software Engineer
                </p>

                {/* Value Proposition */}
                <p 
                    className="mb-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                    style={{
                        color: theme === 'dark' ? '#e2e8f0' : '#475569',
                    }}
                >
                    Building high-performance, SEO-optimized, analytics-ready interfaces at scale.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
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
                        View Projects
                    </Link>
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
                        style={{
                            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                            color: theme === 'dark' ? '#ffffff' : '#334155',
                            border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc';
                            e.target.style.borderColor = theme === 'dark' ? '#64748b' : '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#ffffff';
                            e.target.style.borderColor = theme === 'dark' ? '#475569' : '#cbd5e1';
                        }}
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
