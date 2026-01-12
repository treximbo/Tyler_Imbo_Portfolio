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
    }
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}