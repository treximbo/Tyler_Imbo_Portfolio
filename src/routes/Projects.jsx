import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { useTheme } from "../context/ThemeContext";

export default function Projects() {
    const { theme } = useTheme();
    
    return (
        <section className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] py-12 md:py-16 lg:py-20">
            <h1 
                className="mb-6 md:mb-8"
                style={{
                    color: theme === 'dark' ? '#ffffff' : '#0f172a',
                }}
            >
                Projects
            </h1>
            <div className="mt-8 md:mt-12 grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project}/>
                ))}
            </div>
        </section>
    );
}
