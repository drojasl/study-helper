import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";

interface CategoryHeaderProps {
  badge: string;
  categoryIcon: IconDefinition;
  count: number;
  children?: ReactNode;
}

export function CategoryHeader({
  badge,
  categoryIcon,
  children,
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col gap-2 pb-1">
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <FontAwesomeIcon icon={categoryIcon} className="w-3.5 h-3.5" />
          {badge}
        </span>
      </div>

      {children}
    </div>
  );
}
