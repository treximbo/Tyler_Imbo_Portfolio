import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

export default function ProjectCaseStudy() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const { theme } = useTheme();

    if (!project) {
        return (
            <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
                <div className="max-w-3xl">
                    <h1 
                        className="mb-4"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                    >
                        Project not found
                    </h1>
                    <p 
                        className="mb-6"
                        style={{
                            color: theme === 'dark' ? '#cbd5e1' : '#475569',
                        }}
                    >
                        The case study you're looking for doesn't exist.
                    </p>
                    <Link 
                        to="/projects"
                        className="inline-flex items-center font-medium transition-colors duration-200"
                        style={{
                            color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = theme === 'dark' ? '#93c5fd' : '#1d4ed8';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = theme === 'dark' ? '#60a5fa' : '#2563eb';
                        }}
                    >
                        Return to Project Library
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl">
                <Link 
                    to="/projects"
                    className="inline-flex items-center mb-8 font-medium transition-colors duration-200"
                    style={{
                        color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = theme === 'dark' ? '#93c5fd' : '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = theme === 'dark' ? '#60a5fa' : '#2563eb';
                    }}
                >
                    <svg 
                        className="mr-2 h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Return to Project Library
                </Link>
                <h1 
                    className="mb-6 md:mb-8"
                    style={{
                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                    }}
                >
                    {project.title}
                </h1>
                <p 
                    className="text-lg leading-relaxed"
                    style={{
                        color: theme === 'dark' ? '#e2e8f0' : '#475569',
                    }}
                >
                    {project.summary}
                </p>
            </div>
        </section>
    );
}
