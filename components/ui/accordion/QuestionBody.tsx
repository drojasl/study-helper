import type { Question } from "@/types/question";
import { ActionButtons } from "../questions/ActionButtons";
import { Answer } from "./Answer";

interface QuestionBodyProps {
  question: Question;
  onDeleted?: (id: string) => void;
}

export function QuestionBody({ question, onDeleted }: QuestionBodyProps) {
  return (
    <div className="space-y-4 px-4 pb-5 pt-2 text-sm leading-relaxed text-zinc-600 sm:px-5 md:text-base dark:text-zinc-300">
      <Answer question={question} />
      <ActionButtons question={question} onDeleted={onDeleted} />
    </div>
  );
}