interface FormattedTextProps {
  text: string;
}

export function FormattedText({ text }: FormattedTextProps) {
  const parts = text.split(/(\*\*.+?\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        const key = `${isBold ? "bold" : "text"}-${part}-${index}`;

        return isBold ? (
          <strong key={key} className="font-bold text-zinc-800 dark:text-zinc-100">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={key}>{part}</span>
        );
      })}
    </>
  );
}