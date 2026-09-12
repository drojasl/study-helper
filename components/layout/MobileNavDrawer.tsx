"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLinks } from "./NavLinks";

interface MobileNavDrawerProps {
  onClose: () => void;
}

export function MobileNavDrawer({ onClose }: MobileNavDrawerProps) {
  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FontAwesomeIcon icon={faBrain} className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
              Study Helper
            </span>
          </Link>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Secciones
          </div>
          <NavLinks onNavigate={onClose} />
        </div>

        <div className="border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">Interview Copilot</p>
          <p className="mt-0.5">Mobile-first study platform</p>
        </div>
      </div>
    </div>
  );
}
