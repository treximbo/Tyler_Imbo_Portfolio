export const projects = [
    {
        slug: "event-platform",
        title: "Enterprise Event Platform",
        summary: "Custom WordPress CMS and front-end architecture supporting multiple high-traffic events, with performance optimization and analytics instrumentation.",
        highlights: ["Core Web Vitals Improved: 18 → 88", "GA dataLayer tracking", "Reusable block library", "ACF Data Configuration"],
        tech: ["JavaScript", "WordPress", "PHP", "Performance", "Analytics", "UX"],
        cta: "",
    },
    {
        slug: "ecommerce-platform",
        title: "Modern E-Commerce Platform",
        summary: "Headless commerce solution built with Next.js and React, featuring server-side rendering, optimized checkout flow, and real-time inventory management.",
        highlights: ["50% faster page loads with SSR", "Zero-downtime deployments", "Mobile-first responsive design", "Integrated payment processing"],
        tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe API", "GraphQL"],
        cta: "",
    },
    {
        slug: "design-system",
        title: "Component Design System",
        summary: "Comprehensive design system and component library built with React and Storybook, enabling consistent UI development across multiple product teams.",
        highlights: ["100+ reusable components", "Accessibility WCAG 2.1 AA compliant", "Design tokens integration", "Documentation site"],
        tech: ["React", "Storybook", "TypeScript", "CSS Modules", "Jest", "Testing Library"],
        cta: "",
    },
    {
        slug: "analytics-dashboard",
        title: "Real-Time Analytics Dashboard",
        summary: "Interactive data visualization dashboard with real-time updates, custom chart components, and advanced filtering capabilities for business intelligence.",
        highlights: ["Real-time WebSocket updates", "Custom D3.js visualizations", "Export to PDF/CSV", "Responsive data tables"],
        tech: ["React", "D3.js", "WebSockets", "TypeScript", "Chart.js", "Material-UI"],
        cta: "",
    },
    {
        slug: "progressive-web-app",
        title: "Progressive Web Application",
        summary: "Mobile-first PWA with offline capabilities, push notifications, and app-like experience. Built for field workers requiring reliable access without constant connectivity.",
        highlights: ["Offline-first architecture", "Service Worker caching", "Push notification system", "App store deployment"],
        tech: ["React", "PWA", "Service Workers", "IndexedDB", "Web Push API", "Workbox"],
        cta: "",
    },
    {
        slug: "ux-telemetry-demo",
        title: "UX Telemetry Demo (Local-Only)",
        summary: "Privacy-first, local-only user experience telemetry system built with React and IntersectionObserver. Tracks route views, time on page, scroll depth, click interactions, and section engagement—all stored in browser localStorage with explicit opt-in.",
        highlights: ["Local-only storage (no external transmission)", "Route & scroll depth tracking", "Section engagement via IntersectionObserver", "Opt-in privacy model", "Real-time dashboard UI"],
        tech: ["React", "React Router", "IntersectionObserver API", "localStorage", "React Context", "Tailwind CSS"],
        cta: "",
    },
    {
        slug: "ux-telemetry-dashboard",
        title: "UX Telemetry Demo Dashboard",
        summary: "A local-first analytics demo that tracks user interactions (routes, scroll depth, time on page, and labeled clicks) and visualizes session data in a privacy-safe dashboard.",
        highlights: [
            "Opt-in, local-only telemetry (no data leaves the browser)",
            "Tracks route views, time-on-page, scroll depth, and click events",
            "Custom event schema with rollups and exportable JSON",
            "Telemetry panel UI with session insights and reset controls"
        ],
        tech: ["React", "React Router", "Context API", "localStorage", "IntersectionObserver", "Event schema design"],
        cta: "",
        sections: [
            {
                id: "overview",
                title: "Overview",
                body: "This UX Telemetry Demo Dashboard is a privacy-first analytics system designed to demonstrate local-only user interaction tracking. The system captures route navigation, scroll depth, time-on-page metrics, and labeled click events without transmitting any data outside the browser. All telemetry data is stored in localStorage and can be exported as JSON for analysis."
            },
            {
                id: "goals",
                title: "Goals",
                body: "The primary goal was to build a transparent, opt-in telemetry system that respects user privacy while providing meaningful insights into user behavior. The system needed to demonstrate best practices for event tracking, data aggregation, and visualization without relying on external analytics services. Key requirements included explicit user consent, local-only storage, and a clean dashboard interface for viewing collected metrics."
            },
            {
                id: "event-model",
                title: "Event Model & Schema",
                body: "The telemetry system uses an append-only event log architecture where all interactions are recorded as timestamped events in a session's events array. Event types include route_view, route_time, scroll_depth, click, and section_time. Rollups are derived from these events to calculate aggregated statistics like total time per route, maximum scroll depth, and click counts. This schema enables flexible querying and analysis while maintaining a complete audit trail."
            },
            {
                id: "implementation",
                title: "Implementation Details",
                body: "The system is built with React Context for state management, React Router for route tracking, and IntersectionObserver API for scroll depth and section engagement tracking. Route changes are tracked via useLocation hook, scroll events are throttled with requestAnimationFrame, and section visibility is monitored using IntersectionObserver with a 50% threshold. All tracking respects the enabled state and does nothing when telemetry is disabled."
            },
            {
                id: "dashboard",
                title: "Telemetry Dashboard",
                body: "The dashboard UI is implemented as a slide-in drawer panel accessible via a floating button. When telemetry is disabled, it shows an opt-in explanation and enable button. When enabled, it displays session summary metrics, a per-route table with views and time statistics, top click events, and action buttons for exporting JSON data or resetting collected information. The panel includes proper accessibility features like escape key handling and ARIA labels."
            },
            {
                id: "privacy",
                title: "Privacy & Guardrails",
                body: "Privacy is built into the system's core design. All data remains in the browser's localStorage and is never transmitted to any server. Users must explicitly opt-in before any tracking begins, and they can disable tracking or reset data at any time. The system intentionally avoids tracking sensitive information like form inputs, keystrokes, or personally identifiable data. This approach demonstrates how analytics can be implemented responsibly."
            },
            {
                id: "future",
                title: "Future Enhancements",
                body: "Potential enhancements include support for IndexedDB for larger datasets, more granular filtering and date range selection in the dashboard, visualization charts for time-series data, and additional event types for custom tracking needs. The modular architecture makes it straightforward to extend the system with new tracking capabilities while maintaining the privacy-first approach."
            }
        ]
    }
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}