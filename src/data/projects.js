export const projects = [
    {
        slug: "event-platform",
        title: "Enterprise Event Platform",
        summary: "Custom WordPress CMS and front-end architecture supporting multiple high-traffic events, with performance optimization and analytics instrumentation.",
        highlights: ["Core Web Vitals Improved: 18 → 88", "GA dataLayer tracking", "Reusable block library", "ACF Data Configuration"],
        tech: ["JavaScript", "WordPress", "PHP", "Performance", "Analytics", "UX"],
        cta: "",
    }
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}