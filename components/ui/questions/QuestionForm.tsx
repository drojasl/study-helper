"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCode, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import type { Question, QuestionCategory } from "@/types/question";

const categoryLabels: Record<QuestionCategory, string> = {
  hr: "Recursos Humanos",
  technical: "Técnica Conceptual",
  code: "Técnica de Código",
  "cultural-fit": "Cultural Fit",
};

const emptyJson = JSON.stringify(
  [
    {
      category: "technical",
      question: "",
      answer: "",
      tags: [],
      keyPoints: [],
    },
  ],
  null,
  2,
);

interface QuestionFormProps {
  initialQuestion?: Question;
}

export function QuestionForm({ initialQuestion }: QuestionFormProps) {
  const isEditing = Boolean(initialQuestion);
  const [mode, setMode] = useState<"form" | "raw">("form");
  const [category, setCategory] = useState<QuestionCategory>(initialQuestion?.category ?? "technical");
  const [question, setQuestion] = useState(initialQuestion?.question ?? "");
  const [answer, setAnswer] = useState(initialQuestion?.answer ?? "");
  const [tags, setTags] = useState(initialQuestion?.tags.join(", ") ?? "");
  const [keyPoints, setKeyPoints] = useState(initialQuestion?.keyPoints?.join("\n") ?? "");
  const [rawJson, setRawJson] = useState(emptyJson);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function saveQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSaving(true);

    try {
      const payload = mode === "raw"
        ? JSON.parse(rawJson)
        : { category, question, answer, tags, keyPoints };
      const requestBody = isEditing
        ? { ...payload, category, id: initialQuestion?.id }
        : payload;
      const response = await fetch("/api/questions", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json() as { added?: number; category?: QuestionCategory; error?: string };

      if (!response.ok) throw new Error(result.error ?? "No se pudo guardar la pregunta.");
      setStatus({
        type: "success",
        message: isEditing ? "La pregunta se actualizó correctamente." : `Se agregó ${result.added === 1 ? "la pregunta" : `${result.added} preguntas`} correctamente.`,
      });
      setQuestion("");
      setAnswer("");
      setTags("");
      setKeyPoints("");
      if (mode === "raw") setRawJson(emptyJson);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof SyntaxError ? "El JSON RAW no es válido." : error instanceof Error ? error.message : "No se pudo guardar la pregunta.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  const fieldClassName = "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
  const labelClassName = "text-sm font-semibold text-zinc-800 dark:text-zinc-200";

  return (
    <form onSubmit={saveQuestion} className="space-y-5">
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800" role="tablist" aria-label="Modo de entrada">
        <button type="button" onClick={() => setMode("form")} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${mode === "form" ? "bg-blue-600 text-white" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`} aria-selected={mode === "form"} role="tab">
          Formulario
        </button>
        <button type="button" onClick={() => setMode("raw")} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${mode === "raw" ? "bg-blue-600 text-white" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`} aria-selected={mode === "raw"} role="tab">
          <FontAwesomeIcon icon={faCode} aria-hidden="true" /> JSON RAW
        </button>
      </div>

      {mode === "form" ? (
        <div className="grid gap-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-6">
          <label className={labelClassName}>Categoría
            <select disabled={isEditing} value={category} onChange={(event) => setCategory(event.target.value as QuestionCategory)} className={fieldClassName}>
              {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className={labelClassName}>Pregunta
            <textarea required value={question} onChange={(event) => setQuestion(event.target.value)} className={`${fieldClassName} min-h-24`} placeholder="¿Qué es...?" />
          </label>
          <label className={labelClassName}>Respuesta
            <textarea required value={answer} onChange={(event) => setAnswer(event.target.value)} className={`${fieldClassName} min-h-40`} placeholder="Escribe una respuesta clara y completa..." />
          </label>
          <label className={labelClassName}>Tags <span className="font-normal text-zinc-500">(separados por comas)</span>
            <input value={tags} onChange={(event) => setTags(event.target.value)} className={fieldClassName} placeholder="JavaScript, Asincronía, Promises" />
          </label>
          <label className={labelClassName}>Key points <span className="font-normal text-zinc-500">(uno por línea)</span>
            <textarea value={keyPoints} onChange={(event) => setKeyPoints(event.target.value)} className={`${fieldClassName} min-h-24`} placeholder="Idea clave 1&#10;Idea clave 2" />
          </label>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-6">
          <label className={labelClassName}>JSON de la pregunta
            <textarea required value={rawJson} onChange={(event) => setRawJson(event.target.value)} className={`${fieldClassName} min-h-[26rem] font-mono text-xs`} spellCheck={false} />
          </label>
          <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">Puedes enviar un objeto o un arreglo de preguntas. En un arreglo, cada pregunta debe incluir su `category`; `tags` y `keyPoints` deben ser arreglos.</p>
        </div>
      )}

      {status && <div role="status" className={`rounded-lg border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200" : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"}`}>{status.message}</div>}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={isSaving} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">
          <FontAwesomeIcon icon={isSaving ? faCheck : faFloppyDisk} aria-hidden="true" />
          {isSaving ? "Guardando..." : "Guardar pregunta"}
        </button>
        <Link href={category === "technical" ? "/technical" : `/${category}`} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
          Ver categoría
        </Link>
      </div>
    </form>
  );
}