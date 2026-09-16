import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { CategorySearch } from "@/components/ui/search/CategorySearch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrevista Técnica de Código | Study Helper",
  description: "Algoritmos, snippets de código, manipulación de estructuras de datos y funciones clave.",
};

export default async function CodePage() {
  const questions = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "app", "code", "questions.json"), "utf8"),
  ) as Question[];

  return (
    <div className="space-y-6">
      <CategorySearch
        questions={questions}
        badge="Live Coding & Lógica"
        categoryIcon={faLaptopCode}
      />
    </div>
  );
}
