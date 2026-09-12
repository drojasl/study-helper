"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { Question } from "@/types/question";

interface ActionButtonsProps {
  question: Question;
  onDeleted?: (id: string) => void;
}

export function ActionButtons({ question, onDeleted }: ActionButtonsProps) {
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

      if (!response.ok) {
        throw new Error(result.error ?? "No se pudo eliminar la pregunta.");
      }

      setIsDeleteDialogOpen(false);
      onDeleted?.(question.id);
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "No se pudo eliminar la pregunta.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Link
          href={`/questions/new?category=${question.category}&id=${question.id}`}
          aria-label="Editar pregunta"
          title="Editar pregunta"
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
    </>
  );
}