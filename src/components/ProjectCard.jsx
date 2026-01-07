import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
    const { slug, title, summary, highlights = [], tech = [], cta } = project;
    
    return (
        <article className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 flex-col">
                        <h3>
                            <Link 
                                to={`/projects/${slug}`}
                                className="rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                                >
                                {title}
                            </Link>
                        </h3>
                        {summary ? (
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                {summary}
                            </p>
                        ) : null}

                    {highlights.length ? (
                        <ul className="mt-4 space-y-1 text-sm text-slate-700">
                            {highlights.slice(0, 3).map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {tech.length ? (
                        <div className="mt-4 flex items-start justify-start gap-2 flex-wrap">
                            {tech.slice(0, 6).map((item) => (
                                <div className="bg-slate-100 rounded-lg px-3 py-2 text-sm font-medium">{item}</div>
                            ))}
                        </div>
                    ) : null}

                    {slug ? (
                        <Link to={`/projects/${slug}`}>
                            {cta ? cta : 'See Case Study'}
                        </Link>
                    ) : null}
                </div>
            </div>
        </article>
    );
}