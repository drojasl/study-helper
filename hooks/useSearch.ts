"use client";

import { useState } from "react";
import type { Question } from "@/types/question";

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export function useSearch(questions: Question[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const normalizedSearchTerm = normalize(searchTerm);
  const availableTags = Array.from(
    new Set(questions.flatMap((question) => question.tags)),
  ).sort((firstTag, secondTag) => firstTag.localeCompare(secondTag));

  const filteredQuestions = questions.filter((question) => {
    const searchableText = [
      question.question,
      question.answer,
      ...question.tags,
    ]
      .join(" ")
      .toLocaleLowerCase();
    const matchesSearch =
      normalizedSearchTerm.length === 0 ||
      searchableText.includes(normalizedSearchTerm);
    const matchesTags = selectedTags.every((tag) => question.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const suggestions = questions
    .filter((question) => {
      if (normalizedSearchTerm.length === 0) {
        return false;
      }

      return normalize(question.question).includes(normalizedSearchTerm);
    })
    .slice(0, 5)
    .map((question) => question.question);

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedTags([]);
  }

  return {
    availableTags,
    clearFilters,
    filteredQuestions,
    searchTerm,
    selectedTags,
    setSearchTerm,
    suggestions,
    toggleTag,
  };
}
