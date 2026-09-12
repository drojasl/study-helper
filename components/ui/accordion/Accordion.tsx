"use client";

import { ReactNode, useState } from "react";

interface AccordionHeaderProps {
  isOpen: boolean;
  toggle: () => void;
  contentId: string;
}

interface AccordionProps {
  Header: (props: AccordionHeaderProps) => ReactNode;
  Body: ReactNode;
  contentId: string;
  defaultOpen?: boolean;
}

export function Accordion({
  Header,
  Body,
  contentId,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen((previousIsOpen) => !previousIsOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
      {Header({ isOpen, toggle, contentId })}
      <div
        id={contentId}
        role="region"
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {Body}
        </div>
      </div>
    </div>
  );
}