import type { Metadata } from "next";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { readQuestions } from "@/lib/questions";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Entrevista con HR | Study Helper",
  description: "Preguntas conductuales, fortalezas, debilidades y metodología STAR.",
};

export default async function HrPage() {
  const questions = await readQuestions("hr");

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          category="hr"
          badge="Recursos Humanos"
          categoryIcon={faUsers}
        />
      </div>
    </>
  );
}
