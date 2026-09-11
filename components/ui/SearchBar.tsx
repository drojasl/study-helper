import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  searchTerm: string;
  suggestions: string[];
  onSearchChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
}

export function SearchBar({
  searchTerm,
  suggestions,
  onSearchChange,
  onSuggestionSelect,
}: SearchBarProps) {
  const hasSuggestions = searchTerm.trim().length > 0 && suggestions.length > 0;

  return (
    <div className="relative">
      <label htmlFor="question-search" className="sr-only">
        Buscar preguntas
      </label>
      <div className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          id="question-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por pregunta, respuesta o tag..."
          autoComplete="off"
          className="min-h-12 w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600"
        />
      </div>

      {hasSuggestions && (
        <div
          role="listbox"
          aria-label="Sugerencias de preguntas"
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              role="option"
              aria-selected={false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSuggestionSelect(suggestion)}
              className="min-h-11 w-full px-4 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus:bg-zinc-900"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
