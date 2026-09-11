import type { Metadata } from "next";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategoryHeader } from "@/components/ui/CategoryHeader";
import { QuestionList } from "@/components/ui/QuestionList";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Técnica de Código | Study Helper",
  description: "Algoritmos, snippets de código, manipulación de estructuras de datos y funciones clave.",
};

const questions = questionsData as Question[];

export default function CodePage() {
  return (
    <div className="space-y-6">
      <CategoryHeader
        title="Desafíos de Código y Lógica (PHP)"
        subtitle="Ejercicios prácticos, algoritmos, patrones de diseño y buenas prácticas orientadas a desarrollo en PHP."
        badge="Live Coding & Lógica"
        categoryIcon={faLaptopCode}
        count={questions.length}
      />
      <QuestionList questions={questions} />
    </div>
  );
}
