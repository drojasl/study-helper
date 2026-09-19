import type { Metadata } from "next";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { readQuestions } from "@/lib/questions";
import { CategorySearch } from "@/components/ui/search/CategorySearch";
import { QuestionRouteRefresher } from "@/components/ui/questions/QuestionRouteRefresher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Entrevista Técnica de Código | Study Helper",
  description: "Algoritmos, snippets de código, manipulación de estructuras de datos y funciones clave.",
};

export default async function CodePage() {
  const questions = await readQuestions("code");

  return (
    <>
      <QuestionRouteRefresher />
      <div className="space-y-6">
        <CategorySearch
          questions={questions}
          category="code"
          badge="Live Coding & Lógica"
          categoryIcon={faLaptopCode}
        />
      </div>
    </>
  );
}
