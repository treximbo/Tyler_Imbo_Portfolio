import { Outlet, Link } from "react-router-dom";
import Navigation from "./Navigation";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
                <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)]">
                    <div className="flex items-center justify-between py-3">
                        <Link to="/">TRexDev</Link>
                        <Navigation />
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="border-t border-slate-200 py-8">
                <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)] text-xs text-slate-500">© {new Date().getFullYear()} Tyler Imbo</div>
            </footer>
        </div>
    );
}