import type { Metadata } from "next";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { readQuestions } from "@/lib/questions";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Entrevista Técnica Conceptual | Study Helper",
  description: "Arquitectura de software, patrones, bases de datos y fundamentos.",
};

export default async function TechnicalPage() {
  const questions = await readQuestions("technical");

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          category="technical"
          badge="Técnica Conceptual"
          categoryIcon={faCode}
        />
      </div>
    </>
  );
}
