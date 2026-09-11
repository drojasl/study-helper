import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CategoryHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
  categoryIcon: IconDefinition;
  count: number;
}

export function CategoryHeader({
  title,
  subtitle,
  badge,
  categoryIcon,
  count,
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col gap-2 pb-2">
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <FontAwesomeIcon icon={categoryIcon} className="w-3.5 h-3.5" />
          {badge}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
        {subtitle}
      </p>

      {/* Counter */}
      <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-1">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          {count}
        </span>{" "}
        {count === 1 ? "pregunta preparada" : "preguntas preparadas"}
      </p>
    </div>
  );
}
