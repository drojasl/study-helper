import type { Metadata } from "next";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategoryHeader } from "@/components/ui/CategoryHeader";
import { QuestionList } from "@/components/ui/QuestionList";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista con HR | Study Helper",
  description: "Preguntas conductuales, fortalezas, debilidades y metodología STAR.",
};

const questions = questionsData as Question[];

export default function HrPage() {
  return (
    <div className="space-y-6">
      <CategoryHeader
        title="Entrevista RRHH & Comportamiento"
        subtitle="Estrategias de comunicación, trayectoria profesional y metodología STAR para destacar ante recursos humanos."
        badge="Recursos Humanos"
        categoryIcon={faUsers}
        count={questions.length}
      />
      <QuestionList questions={questions} />
    </div>
  );
}
