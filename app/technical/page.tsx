import type { Metadata } from "next";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/CategorySearch";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Técnica Conceptual | Study Helper",
  description: "Arquitectura de software, patrones, bases de datos y fundamentos.",
};

const questions = questionsData as Question[];

export default function TechnicalPage() {
  return (
    <div className="space-y-6">
      <CategorySearch
        questions={questions}
        badge="Técnica Conceptual"
        categoryIcon={faCode}
      />
    </div>
  );
}
