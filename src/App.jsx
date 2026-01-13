import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import Home from "./routes/Home.jsx";
import Projects from "./routes/Projects.jsx";
import ProjectCaseStudy from "./routes/ProjectCaseStudy.jsx";
import About from "./routes/About.jsx";
import Resume from "./routes/Resume.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}