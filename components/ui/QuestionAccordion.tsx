"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPen,
  faTrash,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";

interface QuestionAccordionProps {
  question: Question;
  defaultOpen?: boolean;
  showTags?: boolean;
  onDeleted?: (id: string) => void;
}

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const isBold = part.startsWith("**") && part.endsWith("**");

        return isBold ? (
          <strong key={`bold-${part}-${index}`} className="font-bold text-zinc-800 dark:text-zinc-100">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={`text-${part}-${index}`}>{part}</span>
        );
      })}
    </>
  );
}

export function QuestionAccordion({
  question,
  defaultOpen = false,
  showTags = true,
  onDeleted,
}: QuestionAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function deleteQuestion() {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch("/api/questions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: question.category, id: question.id }),
      });
      const result = await response.json() as { error?: string };

      if (!response.ok) throw new Error(result.error ?? "No se pudo eliminar la pregunta.");
      setIsDeleteDialogOpen(false);
      onDeleted?.(question.id);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "No se pudo eliminar la pregunta.");
    } finally {
      setIsDeleting(false);
    }
  }

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
            <div className="whitespace-pre-line">
              <FormattedText text={question.answer} />
            </div>

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
                    <li key={`${point}-${index}`}>
                      <FormattedText text={point} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2 dark:border-zinc-800">
              <Link
                href={`/questions/new?category=${question.category}&id=${question.id}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/40"
              >
                <FontAwesomeIcon icon={faPen} aria-hidden="true" />
              </Link>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setDeleteError(null);
                  setIsDeleteDialogOpen(true);
                }}
                aria-label="Eliminar pregunta"
                title="Eliminar pregunta"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60 dark:text-red-300 dark:hover:bg-red-950/40"
              >
                <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setIsDeleteDialogOpen(false);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${question.id}`}
            aria-describedby={`delete-description-${question.id}`}
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300">
                <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 id={`delete-title-${question.id}`} className="text-base font-bold text-zinc-900 dark:text-white">
                    Eliminar pregunta
                  </h2>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setIsDeleteDialogOpen(false)}
                    aria-label="Cerrar confirmación"
                    className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  >
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                  </button>
                </div>
                <p id={`delete-description-${question.id}`} className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Esta acción eliminará esta pregunta de forma permanente. No podrás recuperar sus datos.
                </p>
                <p className="mt-3 line-clamp-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {question.question}
                </p>
              </div>
            </div>

            {deleteError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300" role="alert">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteDialogOpen(false)}
                className="min-h-11 rounded-lg px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={deleteQuestion}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                {isDeleting ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
