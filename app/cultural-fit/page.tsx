import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrevista Cultural Fit | Study Helper",
  description: "Alineación de valores, cultura empresarial, resolución de conflictos y trabajo en equipo.",
};

export default async function CulturalFitPage() {
  const questions = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "app", "cultural-fit", "questions.json"), "utf8"),
  ) as Question[];

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          badge="Cultura & Colaboración"
          categoryIcon={faHeart}
        />
      </div>
    </>
  );
}
