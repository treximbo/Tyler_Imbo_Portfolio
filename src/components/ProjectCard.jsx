import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function ProjectCard({ project }) {
    const { slug, title, summary, highlights = [], tech = [], cta } = project;
    const { theme } = useTheme();
    
    if (!slug) {
        return null;
    }

    return (
        <article 
            className="group rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
                border: `1px solid ${theme === 'dark' ? '#475569' : '#e2e8f0'}`,
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? '#64748b' : '#cbd5e1';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? '#475569' : '#e2e8f0';
            }}
        >
            <Link
                to={`/projects/${slug}`}
                className="block p-6 md:p-8 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded-2xl"
            >
                <div className="flex flex-col gap-6">
                    {/* Title Section */}
                    <div>
                        <h3 
                            className="mb-3 text-xl md:text-2xl font-semibold transition-colors duration-200"
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
                            {title}
                        </h3>
                        {summary ? (
                            <p 
                                className="text-base leading-relaxed"
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                }}
                            >
                                {summary}
                            </p>
                        ) : null}
                    </div>

                    {/* Highlights Section */}
                    {highlights.length ? (
                        <ul className="space-y-2.5">
                            {highlights.slice(0, 3).map((item) => (
                                <li key={item} className="flex gap-3 items-start">
                                    <span 
                                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                                        }}
                                    />
                                    <span 
                                        className="text-sm md:text-base leading-relaxed"
                                        style={{
                                            color: theme === 'dark' ? '#e2e8f0' : '#334155',
                                        }}
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {/* Tech Stack Section */}
                    {tech.length ? (
                        <div className="flex items-start justify-start gap-2 flex-wrap">
                            {tech.slice(0, 6).map((item) => (
                                <span 
                                    key={item} 
                                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs md:text-sm font-medium"
                                    style={{
                                        backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
                                        color: theme === 'dark' ? '#e2e8f0' : '#334155',
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    {/* CTA Visual Indicator */}
                    <div className="pt-2">
                        <div 
                            className="inline-flex items-center text-sm md:text-base font-medium transition-colors duration-200"
                            style={{
                                color: theme === 'dark' ? '#93c5fd' : '#2563eb',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = theme === 'dark' ? '#bfdbfe' : '#1d4ed8';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = theme === 'dark' ? '#93c5fd' : '#2563eb';
                            }}
                        >
                            {cta ? cta : 'See Case Study'}
                            <svg 
                                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
