"use client";

import { useState } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

export function CopyButton({
  value,
  className: classNameProp = "",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      aria-label="Copy to clipboard"
      aria-live="polite"
      className={`shrink-0 inline-flex items-center justify-center p-1 transition ${
        copied ? "text-emerald-600" : "text-muted hover:text-primary"
      } ${classNameProp}`}
    >
      {copied ? (
        <IoCheckmark className="h-4 w-4" />
      ) : (
        <IoCopyOutline className="h-4 w-4" />
      )}
    </button>
  );
}
