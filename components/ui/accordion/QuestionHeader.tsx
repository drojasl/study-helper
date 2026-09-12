import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { Question } from "@/types/question";

interface QuestionHeaderProps {
  question: Question;
  showTags: boolean;
  isOpen: boolean;
  toggle: () => void;
  contentId: string;
}

export function QuestionHeader({
  question,
  showTags,
  isOpen,
  toggle,
  contentId,
}: QuestionHeaderProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={toggle}
      className="flex min-h-[44px] w-full items-start gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 sm:px-5 dark:focus-visible:ring-zinc-600"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {question.question}
        </p>
        {showTags && question.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className={`mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 dark:text-zinc-500 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
      </span>
    </button>
  );
}