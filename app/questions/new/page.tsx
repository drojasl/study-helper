import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { QuestionForm } from "@/components/ui/QuestionForm";
import type { Question, QuestionCategory } from "@/types/question";

export const metadata: Metadata = {
  title: "Agregar preguntas | Study Helper",
  description: "Agrega preguntas nuevas a las categorías de entrevistas.",
};

interface NewQuestionPageProps {
  searchParams: Promise<{ category?: string; id?: string }>;
}

const categories: QuestionCategory[] = ["hr", "technical", "code", "cultural-fit"];

export default async function NewQuestionPage({ searchParams }: NewQuestionPageProps) {
  const params = await searchParams;
  const category = categories.includes(params.category as QuestionCategory)
    ? params.category as QuestionCategory
    : undefined;
  let initialQuestion: Question | undefined;

  if (category && params.id) {
    const filePath = path.join(process.cwd(), "app", category, "questions.json");
    const questions = JSON.parse(await fs.readFile(filePath, "utf8")) as Question[];
    initialQuestion = questions.find((question) => question.id === params.id);
  }

  const isEditing = Boolean(initialQuestion);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          Biblioteca
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
          {isEditing ? "Editar pregunta" : "Agregar preguntas"}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {isEditing
            ? "Actualiza los campos y guarda los cambios para sobrescribir la pregunta existente."
            : "Completa el formulario o pega una pregunta en formato JSON. Se guardará en el archivo de la categoría seleccionada."}
        </p>
      </header>
      <QuestionForm initialQuestion={initialQuestion} />
    </div>
  );
}