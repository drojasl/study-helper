import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

interface SectionPlaceholderProps {
  title: string;
  subtitle: string;
  categoryIcon: IconDefinition;
  badge: string;
}

export function SectionPlaceholder({
  title,
  subtitle,
  categoryIcon,
  badge,
}: SectionPlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <FontAwesomeIcon icon={categoryIcon} className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
          {subtitle}
        </p>
      </div>

      {/* Placeholder content card */}
      <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-950/50 p-8 text-center">
        <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 mb-4">
          <FontAwesomeIcon icon={faHourglassHalf} className="w-5 h-5" />
        </div>
        <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
          Módulo en preparación
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Próximamente se integrarán las preguntas, respuestas predefinidas y el buscador rápido
          diseñado para esta sección.
        </p>
      </div>
    </div>
  );
}
