import type { Metadata } from "next";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/CategorySearch";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista con HR | Study Helper",
  description: "Preguntas conductuales, fortalezas, debilidades y metodología STAR.",
};

const questions = questionsData as Question[];

export default function HrPage() {
  return (
    <div className="space-y-6">
      <CategorySearch
        questions={questions}
        badge="Recursos Humanos"
        categoryIcon={faUsers}
      />
    </div>
  );
}
