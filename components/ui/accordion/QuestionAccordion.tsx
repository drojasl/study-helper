"use client";

import { Question } from "@/types/question";
import { Accordion } from "./Accordion";
import { QuestionBody } from "./QuestionBody";
import { QuestionHeader } from "./QuestionHeader";

interface QuestionAccordionProps {
  question: Question;
  defaultOpen?: boolean;
  showTags?: boolean;
  onDeleted?: (id: string) => void;
}

export function QuestionAccordion({
  question,
  defaultOpen = false,
  showTags = true,
  onDeleted,
}: QuestionAccordionProps) {
  return (
    <Accordion
      contentId={`faq-${question.id}`}
      defaultOpen={defaultOpen}
      Header={({ isOpen, toggle, contentId }) => (
        <QuestionHeader
          question={question}
          showTags={showTags}
          isOpen={isOpen}
          toggle={toggle}
          contentId={contentId}
        />
      )}
      Body={<QuestionBody question={question} onDeleted={onDeleted} />}
    />
  );
}
