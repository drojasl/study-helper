import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrevista Técnica Conceptual | Study Helper",
  description: "Arquitectura de software, patrones, bases de datos y fundamentos.",
};

export default async function TechnicalPage() {
  const questions = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "app", "technical", "questions.json"), "utf8"),
  ) as Question[];

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          badge="Técnica Conceptual"
          categoryIcon={faCode}
        />
      </div>
    </>
  );
}
