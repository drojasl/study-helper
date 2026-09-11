"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faBrain } from "@fortawesome/free-solid-svg-icons";
import { NavLinks } from "./NavLinks";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
            <FontAwesomeIcon icon={faBrain} className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
            Study Helper
          </span>
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Drawer Backdrop & Panel */}
      {isOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-zinc-950 p-4 shadow-xl flex flex-col border-r border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white">
                  <FontAwesomeIcon icon={faBrain} className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white">
                  Study Helper
                </span>
              </Link>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Secciones
              </div>
              <NavLinks onNavigate={() => setIsOpen(false)} />
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">Interview Copilot</p>
              <p className="mt-0.5">Mobile-first study platform</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
