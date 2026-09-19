"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileImport } from "@fortawesome/free-solid-svg-icons";
import type { Question, QuestionCategory } from "@/types/question";

interface QuestionDataActionsProps {
  category: QuestionCategory;
  pageTitle: string;
  questions: Question[];
}

const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function createDownloadName(pageTitle: string): string {
  const normalizedTitle = pageTitle
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${normalizedTitle}-${day}-${month}-${year}.json`;
}

export function QuestionDataActions({ category, pageTitle, questions }: QuestionDataActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  function exportQuestions() {
    const content = `${JSON.stringify(questions, null, 2)}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = createDownloadName(pageTitle);
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importQuestions(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setStatus(null);
    setIsImporting(true);

    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      if (!Array.isArray(parsed)) {
        throw new Error("El archivo debe contener un arreglo de preguntas.");
      }

      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, questions: parsed, replace: true }),
      });
      const result = await response.json() as { count?: number; error?: string };

      if (!response.ok) throw new Error(result.error ?? "No se pudo importar el archivo.");
      setStatus({
        type: "success",
        message: `Se importaron ${result.count ?? parsed.length} preguntas correctamente.`,
      });
      window.location.reload();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof SyntaxError
          ? "El archivo no contiene JSON válido."
          : error instanceof Error ? error.message : "No se pudo importar el archivo.",
      });
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-4">
      <button
        type="button"
        onClick={exportQuestions}
        aria-label="Exportar questions.json"
        title="Exportar questions.json"
        className="inline-flex size-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        aria-label="Importar questions.json y reemplazar las preguntas"
        title="Importar questions.json y reemplazar las preguntas"
        className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        <FontAwesomeIcon icon={faFileImport} aria-hidden="true" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={importQuestions}
        className="sr-only"
      />
      {status && (
        <p
          role="status"
          className={`w-full text-right text-xs ${status.type === "error" ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}