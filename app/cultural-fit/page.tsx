import type { Metadata } from "next";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { readQuestions } from "@/lib/questions";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Entrevista Cultural Fit | Study Helper",
  description: "Alineación de valores, cultura empresarial, resolución de conflictos y trabajo en equipo.",
};

export default async function CulturalFitPage() {
  const questions = await readQuestions("cultural-fit");

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          category="cultural-fit"
          badge="Cultura & Colaboración"
          categoryIcon={faHeart}
        />
      </div>
    </>
  );
}
