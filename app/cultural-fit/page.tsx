import type { Metadata } from "next";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import questionsData from "./questions.json";

export const metadata: Metadata = {
  title: "Entrevista Cultural Fit | Study Helper",
  description: "Alineación de valores, cultura empresarial, resolución de conflictos y trabajo en equipo.",
};

const questions = questionsData as Question[];

export default function CulturalFitPage() {
  return (
    <div className="space-y-6">
      <CategorySearch
        questions={questions}
        badge="Cultura & Colaboración"
        categoryIcon={faHeart}
      />
    </div>
  );
}
