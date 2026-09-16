import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrevista con HR | Study Helper",
  description: "Preguntas conductuales, fortalezas, debilidades y metodología STAR.",
};

export default async function HrPage() {
  const questions = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "app", "hr", "questions.json"), "utf8"),
  ) as Question[];

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
