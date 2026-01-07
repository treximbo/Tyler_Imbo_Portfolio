import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12">
            <h1>Projects</h1>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project}/>
                ))}
            </div>
        </section>
    );
}