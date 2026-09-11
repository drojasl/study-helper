import type { Metadata } from "next";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategoryHeader } from "@/components/ui/CategoryHeader";
import { QuestionList } from "@/components/ui/QuestionList";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Cultural Fit | Study Helper",
  description: "Alineación de valores, cultura empresarial, resolución de conflictos y trabajo en equipo.",
};

const questions = questionsData as Question[];

export default function CulturalFitPage() {
  return (
    <div className="space-y-6">
      <CategoryHeader
        title="Fit Cultural & Trabajo en Equipo"
        subtitle="Resolución de desacuerdos, alineación con la cultura del equipo, gestión de prioridades y feedback constructivo."
        badge="Cultura & Colaboración"
        categoryIcon={faHeart}
        count={questions.length}
      />
      <QuestionList questions={questions} />
    </div>
  );
}
