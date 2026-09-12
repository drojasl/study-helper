interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  isExpanded: boolean;
  onToggleVisibility: () => void;
}

export function TagFilter({
  availableTags,
  selectedTags,
  onToggleTag,
  isExpanded,
  onToggleVisibility,
}: TagFilterProps) {
  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
            {!isExpanded && selectedTags.length === 0 && (
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
                No hay tags seleccionados.
            </p>
            )}
        </div>
        <button
          type="button"
          onClick={onToggleVisibility}
          className="min-h-9 rounded-lg px-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-blue-300 dark:hover:bg-blue-950/40"
        >
          {isExpanded ? "Ocultar tags" : "Mostrar tags"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(isExpanded
          ? availableTags
          : availableTags.filter((tag) => selectedTags.includes(tag))
        ).map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggleTag(tag)}
              className={`rounded-full border px-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-blue-300 hover:text-blue-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-blue-700 dark:hover:text-blue-300"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
