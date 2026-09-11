export type QuestionCategory = "hr" | "technical" | "code" | "cultural-fit";

export interface Question {
  id: string;
  question: string;
  answer: string;
  category: QuestionCategory;
  tags: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  keyPoints?: string[];
}
