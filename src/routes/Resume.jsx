import { useTheme } from "../context/ThemeContext";
import { useTelemetry } from "../telemetry/TelemetryProvider";

export default function Resume() {
    const { theme } = useTheme();
    const { trackClick } = useTelemetry();
    
    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
            <h1 
                className="mb-8"
                style={{
                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                }}
            >
                Resume
            </h1>

            <div 
                className="max-w-4xl space-y-10"
                style={{
                    color: theme === 'dark' ? '#e2e8f0' : '#334155',
                }}
            >
                {/* Experience Section */}
                <section>
                    <h2 
                        className="text-2xl font-semibold mb-6"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                    >
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {/* Senior Developer */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <h3 
                                    className="text-xl font-semibold"
                                    style={{
                                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                    }}
                                >
                                    Senior Developer
                                </h3>
                                <span 
                                    className="text-sm font-medium whitespace-nowrap"
                                    style={{
                                        color: theme === 'dark' ? '#94a3b8' : '#64748b',
                                    }}
                                >
                                    April 2025 - PRESENT
                                </span>
                            </div>
                            <p 
                                className="text-base mb-2 font-medium"
                                style={{
                                    color: theme === 'dark' ? '#cbd5e1' : '#475569',
                                }}
                            >
                                Arizent, New York, NY
                            </p>
                            <p className="text-base leading-relaxed">
                                Lead front-end engineer responsible for designing, implementing, and maintaining scalable, high-performance user interfaces across enterprise editorial and event platforms. Focused on UI architecture, animation, SEO, accessibility, analytics integration, and CI/CD best practices.
                            </p>
                        </div>

                        {/* Developer */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <h3 
                                    className="text-xl font-semibold"
                                    style={{
                                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                    }}
                                >
                                    Developer
                                </h3>
                                <span 
                                    className="text-sm font-medium whitespace-nowrap"
                                    style={{
                                        color: theme === 'dark' ? '#94a3b8' : '#64748b',
                                    }}
                                >
                                    April 2020 - April 2025
                                </span>
                            </div>
                            <p 
                                className="text-base mb-2 font-medium"
                                style={{
                                    color: theme === 'dark' ? '#cbd5e1' : '#475569',
                                }}
                            >
                                Arizent, New York, NY
                            </p>
                            <p className="text-base leading-relaxed">
                                Front-end engineer supporting high-traffic, content-driven platforms through development of responsive, SEO-compliant, and analytics-ready user interfaces. Collaborated cross-functionally to deliver interactive features, optimize performance, and support revenue-critical subscription and event workflows.
                            </p>
                        </div>

                        {/* Project Manager */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <h3 
                                    className="text-xl font-semibold"
                                    style={{
                                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                    }}
                                >
                                    Project Manager, Data & Systems
                                </h3>
                                <span 
                                    className="text-sm font-medium whitespace-nowrap"
                                    style={{
                                        color: theme === 'dark' ? '#94a3b8' : '#64748b',
                                    }}
                                >
                                    December 2018 - April 2020
                                </span>
                            </div>
                            <p 
                                className="text-base mb-2 font-medium"
                                style={{
                                    color: theme === 'dark' ? '#cbd5e1' : '#475569',
                                }}
                            >
                                Arizent, New York, NY
                            </p>
                            <p className="text-base leading-relaxed">
                                Owned delivery of data-driven and systems-focused initiatives, coordinating stakeholders across engineering, data, and business teams. Developed strong foundations in technical requirements, system thinking, and cross-functional communication that later informed engineering leadership.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section>
                    <h2 
                        className="text-2xl font-semibold mb-6"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                    >
                        Education
                    </h2>
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <h3 
                                className="text-xl font-semibold"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Bachelor of Applied Science - BASc
                            </h3>
                            <span 
                                className="text-sm font-medium whitespace-nowrap"
                                style={{
                                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                                }}
                            >
                                January 2014 - May 2017
                            </span>
                        </div>
                        <p 
                            className="text-base mb-2 font-medium"
                            style={{
                                color: theme === 'dark' ? '#cbd5e1' : '#475569',
                            }}
                        >
                            The University of Connecticut, Storrs, CT
                        </p>
                        <p className="text-base leading-relaxed mb-2">
                            Marketing & Business Management, International Development and Environmental Economics & Policy.
                        </p>
                        <p 
                            className="text-sm"
                            style={{
                                color: theme === 'dark' ? '#94a3b8' : '#64748b',
                            }}
                        >
                            Irving Fellows Scholarship recipient (Resource Economics scholarship), Fall 2016
                        </p>
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <h2 
                        className="text-2xl font-semibold mb-6"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                    >
                        Projects
                    </h2>
                    <div>
                        <h3 
                            className="text-xl font-semibold mb-2"
                            style={{
                                color: theme === 'dark' ? '#ffffff' : '#0f172a',
                            }}
                        >
                            Enterprise Event Platform — The Most Powerful Women in Banking
                        </h3>
                        <p className="text-base leading-relaxed">
                            Led the end-to-end design and engineering of a custom WordPress-based event platform supporting a department-wide marketing and editorial operation. Architected the CMS structure, developed all custom Gutenberg blocks, and implemented front-end performance optimizations, improving Core Web Vitals performance from failing (PageSpeed score ~18) to passing (score ~88). Integrated analytics instrumentation by emitting structured events to the Google Analytics data layer, enabling reliable tracking of user interactions, content engagement, and conversion-related actions across high-traffic event pages.
                        </p>
                    </div>
                </section>

                {/* Skills Section */}
                <section>
                    <h2 
                        className="text-2xl font-semibold mb-6"
                        style={{
                            color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        }}
                    >
                        Skills
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Front End
                            </h3>
                            <p className="text-base">
                                JavaScript (ES6+), React, jQuery, HTML5, CSS3, SCSS, Tailwind CSS
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Layout & Styling
                            </h3>
                            <p className="text-base">
                                Flexbox, CSS Grid, responsive and mobile-first design
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                UI & Animation
                            </h3>
                            <p className="text-base">
                                CSS Animations, GSAP-style motion patterns, interaction-driven UI
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                SEO & Analytics
                            </h3>
                            <p className="text-base">
                                Semantic HTML, performance optimization, analytics instrumentation, data-layer driven event tracking
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Platforms
                            </h3>
                            <p className="text-base">
                                WordPress, custom block architectures, component-based UI systems
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                DevOps
                            </h3>
                            <p className="text-base">
                                Git, GitHub Actions, CI/CD pipelines, multi-environment deployments
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Accessibility
                            </h3>
                            <p className="text-base">
                                WCAG-compliant front-end development
                            </p>
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold mb-2"
                                style={{
                                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                                }}
                            >
                                Ways of Working
                            </h3>
                            <p className="text-base">
                                Agile/Scrum, cross-functional collaboration
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating Action Button */}
            <a
                href="/Resume 2026.pdf"
                download="Tyler_Imbo_Resume_2026.pdf"
                onClick={() => trackClick('Resume Download', { type: 'outbound', file: 'Resume 2026.pdf' })}
                className="fab-button fixed bottom-8 right-8 z-50 flex items-center rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 overflow-hidden"
                style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                    color: '#ffffff',
                    boxShadow: theme === 'dark' 
                        ? '0 10px 25px rgba(59, 130, 246, 0.4)' 
                        : '0 10px 25px rgba(37, 99, 235, 0.3)',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.width = '224px';
                    e.currentTarget.style.paddingRight = '24px';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2563eb' : '#1d4ed8';
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 12px 30px rgba(59, 130, 246, 0.5)' 
                        : '0 12px 30px rgba(37, 99, 235, 0.4)';
                    const textSpan = e.currentTarget.querySelector('.fab-text');
                    if (textSpan) {
                        textSpan.style.opacity = '1';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.width = '56px';
                    e.currentTarget.style.paddingRight = '0';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
                    e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 10px 25px rgba(59, 130, 246, 0.4)' 
                        : '0 10px 25px rgba(37, 99, 235, 0.3)';
                    const textSpan = e.currentTarget.querySelector('.fab-text');
                    if (textSpan) {
                        textSpan.style.opacity = '0';
                    }
                }}
                aria-label="Download Resume PDF"
                title="Download Resume PDF"
            >
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: '56px' }}>
                    <svg 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                    </svg>
                </div>
                <span 
                    className="fab-text text-base font-medium whitespace-nowrap"
                    style={{
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                        transitionDelay: '0.1s',
                    }}
                >
                    Download Resume
                </span>
            </a>
        </section>
    );
}
