import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { useTelemetry } from "../telemetry/TelemetryProvider";
import { useSectionTracking } from "../telemetry/useSectionTracking";

export default function ProjectCaseStudy() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    const { theme } = useTheme();
    const { trackClick } = useTelemetry();
    
    // Track section engagement if project has sections
    const sectionIds = project?.sections?.map(s => s.id) || [];
    useSectionTracking(sectionIds.length > 0 ? sectionIds : []);

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

    const hasSections = project.sections && Array.isArray(project.sections) && project.sections.length > 0;

    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
            <div className={hasSections ? "max-w-[65ch]" : "max-w-4xl"}>
                <Link 
                    to="/projects"
                    onClick={() => trackClick('Case Study: Return to Projects')}
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
                    className="text-lg leading-relaxed mb-12"
                    style={{
                        color: theme === 'dark' ? '#e2e8f0' : '#475569',
                    }}
                >
                    {project.summary}
                </p>

                {/* Table of Contents - only show if sections exist */}
                {hasSections && (
                    <nav 
                        className="mb-12 rounded-lg p-6"
                        style={{
                            backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                        }}
                        aria-label="Table of contents"
                    >
                        <h2 
                            className="mb-4 text-sm font-semibold uppercase tracking-wide"
                            style={{
                                color: theme === 'dark' ? '#94a3b8' : '#64748b',
                            }}
                        >
                            Contents
                        </h2>
                        <ul className="space-y-2">
                            {project.sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className="text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
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
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {/* Render project sections if they exist, otherwise render default sections */}
                {hasSections ? (
                    <div className="space-y-16">
                        {project.sections.map((section) => (
                            <section 
                                key={section.id}
                                id={section.id} 
                                className="scroll-mt-8"
                            >
                                <h2 
                                    className="mb-4 text-2xl font-semibold"
                                    style={{
                                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                    }}
                                >
                                    {section.title}
                                </h2>
                                <p 
                                    className="leading-relaxed"
                                    style={{
                                        color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                    }}
                                >
                                    {section.body}
                                </p>
                            </section>
                        ))}
                    </div>
                ) : (
                    /* Fallback: Default sections for projects without sections array */
                    <div className="space-y-16">
                        <section id="context" className="scroll-mt-8">
                            <h2 
                                className="mb-4 text-2xl font-semibold"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Context
                            </h2>
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none"
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                }}
                            >
                                <p className="leading-relaxed">
                                    This section provides background and context for the project. 
                                    Section engagement is tracked when this area is visible in the viewport.
                                </p>
                            </div>
                        </section>

                        <section id="constraints" className="scroll-mt-8">
                            <h2 
                                className="mb-4 text-2xl font-semibold"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Constraints
                            </h2>
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none"
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                }}
                            >
                                <p className="leading-relaxed">
                                    Technical, business, and design constraints that shaped the solution.
                                </p>
                            </div>
                        </section>

                        <section id="implementation" className="scroll-mt-8">
                            <h2 
                                className="mb-4 text-2xl font-semibold"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Implementation
                            </h2>
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none"
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                }}
                            >
                                <p className="leading-relaxed">
                                    Details about the technical approach, architecture decisions, and key implementation details.
                                </p>
                            </div>
                        </section>

                        <section id="results" className="scroll-mt-8">
                            <h2 
                                className="mb-4 text-2xl font-semibold"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Results
                            </h2>
                            <div 
                                className="prose prose-slate dark:prose-invert max-w-none"
                                style={{
                                    color: theme === 'dark' ? '#e2e8f0' : '#475569',
                                }}
                            >
                                <p className="leading-relaxed">
                                    Outcomes, metrics, and impact of the project.
                                </p>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </section>
    );
}
