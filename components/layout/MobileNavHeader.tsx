"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBrain, faXmark } from "@fortawesome/free-solid-svg-icons";

interface MobileNavHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileNavHeader({ isOpen, onToggle }: MobileNavHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/90">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <FontAwesomeIcon icon={faBrain} className="h-4 w-4" />
        </div>
        <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
          Study Helper
        </span>
      </Link>

      <button
        type="button"
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="h-5 w-5" />
      </button>
    </header>
  );
}
