import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";

export default function ProjectCaseStudy() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <section>
                <h1>Project not found</h1>
                <p>The case study you're looking for doesn't exist.</p>
                <Link to="/projects">Return to Project Library</Link>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12">
            <Link to="/projects">Return to Project Library</Link>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
        </section>
    );
}