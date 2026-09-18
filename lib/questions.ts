import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question, QuestionCategory } from "@/types/question";

export function getQuestionsFilePath(category: QuestionCategory): string {
  return path.join(process.cwd(), "app", category, "questions.json");
}

export async function readQuestions(category: QuestionCategory): Promise<Question[]> {
  const filePath = getQuestionsFilePath(category);

  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as Question[];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function writeQuestions(
  category: QuestionCategory,
  questions: Question[],
): Promise<void> {
  const filePath = getQuestionsFilePath(category);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(questions, null, 2)}\n`, "utf8");
}
