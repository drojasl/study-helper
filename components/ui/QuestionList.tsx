import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { Question } from "@/types/question";
import { QuestionAccordion } from "./QuestionAccordion";

interface QuestionListProps {
  questions: Question[];
  emptyMessage?: string;
  className?: string;
  showTags?: boolean;
}

export function QuestionList({
  questions,
  emptyMessage = "No hay preguntas disponibles en esta categoría por el momento.",
  className,
  showTags = true,
}: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-16 text-center text-zinc-400 dark:text-zinc-600 gap-4 ${className ?? ""}`}
      >
        <FontAwesomeIcon icon={faInbox} className="w-10 h-10 opacity-50" />
        <p className="text-sm max-w-xs">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      {questions.map((item) => (
        <QuestionAccordion
          key={item.id}
          question={item}
          showTags={showTags}
        />
      ))}
    </div>
  );
}
