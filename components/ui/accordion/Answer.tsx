import type { Question } from "@/types/question";
import { FormattedText } from "./FormattedText";

interface AnswerProps {
  question: Question;
}

export function Answer({ question }: AnswerProps) {
  return (
    <>
      <div className="whitespace-pre-line">
        <FormattedText text={question.answer} />
      </div>

      {question.codeSnippet && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-emerald-400 md:text-sm">
          <div className="mb-2 flex items-center justify-between border-b border-zinc-800 pb-2 text-xs uppercase tracking-wider text-zinc-400">
            <span>{question.codeLanguage || "code"}</span>
          </div>
          <pre className="overflow-x-auto">
            <code>{question.codeSnippet}</code>
          </pre>
        </div>
      )}

      {question.keyPoints && question.keyPoints.length > 0 && (
        <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3 dark:border-blue-900/50 dark:bg-blue-950/30">
          <ul className="list-inside list-disc space-y-1 text-xs text-blue-900 dark:text-blue-200">
            {question.keyPoints.map((point, index) => (
              <li key={`${point}-${index}`}>
                <FormattedText text={point} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}