import { promises as fs } from "node:fs";
import path from "node:path";
import type { Question, QuestionCategory } from "@/types/question";

export function getQuestionsFilePath(category: QuestionCategory): string {
  return path.join(process.cwd(), "app", category, "questions.json");
}

export async function readQuestions(category: QuestionCategory): Promise<Question[]> {
  const filePath = getQuestionsFilePath(category);
  console.info("[questions-debug] read:start", {
    category,
    filePath,
    timestamp: new Date().toISOString(),
  });
  const content = await fs.readFile(filePath, "utf8");
  const questions = JSON.parse(content) as Question[];
  console.info("[questions-debug] read:done", {
    category,
    count: questions.length,
    ids: questions.map((question) => question.id),
    timestamp: new Date().toISOString(),
  });
  return questions;
}

export async function writeQuestions(
  category: QuestionCategory,
  questions: Question[],
): Promise<void> {
  const filePath = getQuestionsFilePath(category);
  console.info("[questions-debug] write:start", {
    category,
    filePath,
    count: questions.length,
    timestamp: new Date().toISOString(),
  });
  await fs.writeFile(filePath, `${JSON.stringify(questions, null, 2)}\n`, "utf8");
  console.info("[questions-debug] write:done", {
    category,
    filePath,
    count: questions.length,
    timestamp: new Date().toISOString(),
  });
}
