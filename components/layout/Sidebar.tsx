import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { NavLinks } from "./NavLinks";

export function Sidebar() {
  return (
    <aside
      aria-label="Navegación principal"
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-30"
    >
      <div className="flex items-center gap-3 px-6 h-16 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white">
          <FontAwesomeIcon icon={faBrain} className="w-5 h-5" />
        </div>
        <Link href="/" className="font-bold text-base tracking-tight text-zinc-900 dark:text-white hover:opacity-90">
          Study Helper
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Entrevistas
        </div>
        <NavLinks />
      </div>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
        <p className="font-medium text-zinc-700 dark:text-zinc-300">Interview Copilot</p>
        <p className="mt-0.5">Preparación & Respuestas</p>
      </div>
    </aside>
  );
}
