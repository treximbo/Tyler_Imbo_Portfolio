import { NavLink, Link } from "react-router-dom";

function NavItem({to, children}) {
    return (
        <NavLink
        to={to}
        className={({isActive}) => {
            return `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive 
                ? "bg-slate-900 text-white" 
                : "text-slate-700 hover:bg-slate-100" 
            }`
        }}>
            {children}
        </NavLink>
    );
}

export default function Navigation() {
 return (
    <nav className="flex gap-[10px]">
        <NavItem to="/projects">Projects</NavItem>
        <NavItem to="/about">About Me</NavItem>
        <NavItem to="/resume">Resume</NavItem>
    </nav>
 );
}