"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";

interface QuestionAccordionProps {
  question: Question;
  defaultOpen?: boolean;
  showTags?: boolean;
}

export function QuestionAccordion({
  question,
  defaultOpen = false,
  showTags = true,
}: QuestionAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow-xs overflow-hidden">
      {/* Toggle Button */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`faq-${question.id}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left min-h-[44px] py-4 px-4 sm:px-5 flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
      >
        {/* Question text + tags */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
            {question.question}
          </p>
          {showTags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chevron indicator */}
        <span
          aria-hidden="true"
          className={`mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </span>
      </button>

      {/* Expandable content — CSS Grid animation */}
      <div
        id={`faq-${question.id}`}
        role="region"
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-5 px-4 sm:px-5 text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
            {/* Answer */}
            <div className="whitespace-pre-line">{question.answer}</div>

            {/* Code Snippet */}
            {question.codeSnippet && (
              <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <span>{question.codeLanguage || "code"}</span>
                </div>
                <pre>
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Key Points */}
            {question.keyPoints && question.keyPoints.length > 0 && (
              <div className="mt-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                <ul className="list-disc list-inside space-y-1 text-xs text-blue-900 dark:text-blue-200">
                  {question.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
