"use client";

import { ReactNode, useRef, useState } from "react";

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
  const accordionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => {
    setIsOpen((previousIsOpen) => {
      const nextIsOpen = !previousIsOpen;
      if (nextIsOpen) {
        requestAnimationFrame(() => {
          accordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return nextIsOpen;
    });
  };

  return (
    <div ref={accordionRef} className={`scroll-mt-4 overflow-hidden rounded-xl border bg-white transition-colors shadow-xs dark:bg-zinc-950 ${
      isOpen
        ? "border-blue-500 shadow-md dark:border-blue-400"
        : "border-zinc-200 dark:border-zinc-800"
    }`}>
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