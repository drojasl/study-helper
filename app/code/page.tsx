import type { Metadata } from "next";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Técnica de Código | Study Helper",
  description: "Algoritmos, snippets de código, manipulación de estructuras de datos y funciones clave.",
};

const questions = questionsData as Question[];

export default function CodePage() {
  return (
    <div className="space-y-6">
      <CategorySearch
        questions={questions}
        badge="Live Coding & Lógica"
        categoryIcon={faLaptopCode}
      />
    </div>
  );
}
