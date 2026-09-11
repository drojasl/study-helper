import type { Metadata } from "next";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategoryHeader } from "@/components/ui/CategoryHeader";
import { QuestionList } from "@/components/ui/QuestionList";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Técnica Conceptual | Study Helper",
  description: "Arquitectura de software, patrones, bases de datos y fundamentos.",
};

const questions = questionsData as Question[];

export default function TechnicalPage() {
  return (
    <div className="space-y-6">
      <CategoryHeader
        title="Preguntas Técnicas Conceptuales"
        subtitle="Domina conceptos fundamentales de arquitectura, patrones de diseño, bases de datos y rendimiento web."
        badge="Técnica Conceptual"
        categoryIcon={faCode}
        count={questions.length}
      />
      <QuestionList questions={questions} />
    </div>
  );
}
