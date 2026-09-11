"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { Question } from "@/types/question";
import { useSearch } from "@/hooks/useSearch";
import { CategoryHeader } from "./CategoryHeader";
import { QuestionList } from "./QuestionList";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";

interface CategorySearchProps {
  questions: Question[];
  badge: string;
  categoryIcon: IconDefinition;
}

export function CategorySearch({
  questions,
  badge,
  categoryIcon,
}: CategorySearchProps) {
  const [isTagFilterExpanded, setIsTagFilterExpanded] = useState(true);
  const {
    availableTags,
    clearFilters,
    filteredQuestions,
    searchTerm,
    selectedTags,
    setSearchTerm,
    suggestions,
    toggleTag,
  } = useSearch(questions);
  const hasFilters = searchTerm.trim().length > 0 || selectedTags.length > 0;
  const emptyMessage = hasFilters
    ? "No encontramos preguntas con estos filtros."
    : "No hay preguntas disponibles en esta categoría por el momento.";

  return (
    <section aria-label="Buscar y filtrar preguntas" className="space-y-5">
      <CategoryHeader
        badge={badge}
        categoryIcon={categoryIcon}
        count={questions.length}
      >
        <SearchBar
          searchTerm={searchTerm}
          suggestions={suggestions}
          onSearchChange={setSearchTerm}
          onSuggestionSelect={setSearchTerm}
        />
        <TagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          isExpanded={isTagFilterExpanded}
          onToggleVisibility={() =>
            setIsTagFilterExpanded((isExpanded) => !isExpanded)
          }
        />
        <div className="flex flex-wrap items-center justify-end gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {filteredQuestions.length}
            </span>{" "}
            {filteredQuestions.length === 1 ? "resultado" : "resultados"}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-blue-300 dark:hover:bg-blue-950/40"
            >
              <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>
      </CategoryHeader>
      <QuestionList
        questions={filteredQuestions}
        emptyMessage={emptyMessage}
        showTags={isTagFilterExpanded}
      />
    </section>
  );
}
