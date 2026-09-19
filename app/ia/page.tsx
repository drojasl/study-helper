import type { Metadata } from "next";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { readQuestions } from "@/lib/questions";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Entrevista de IA | Study Helper",
  description: "Prompt engineering, modelos, evaluación, producto con IA y arquitectura de soluciones inteligentes.",
};

export default async function IAPage() {
  const questions = await readQuestions("ia");

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          category="ia"
          badge="IA / Inteligencia Artificial"
          categoryIcon={faRobot}
        />
      </div>
    </>
  );
}
