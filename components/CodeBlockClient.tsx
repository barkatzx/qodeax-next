"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockClientProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlockClient({
  code,
  language = "text",
  title,
  showLineNumbers = false,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);
  const codeLines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-dark-soft bg-dark">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">
          {title || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10.5px] font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3 text-brand" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-[12.5px] leading-6 text-[#d9e6df]">
        <code className="font-mono">
          {showLineNumbers ? (
            <span className="grid gap-0">
              {codeLines.map((line, index) => (
                <span key={index} className="table-row">
                  <span className="table-cell w-8 pr-4 text-right text-white/25 select-none">
                    {index + 1}
                  </span>
                  <span className="table-cell whitespace-pre">{line}</span>
                </span>
              ))}
            </span>
          ) : (
            <span className="whitespace-pre">{code}</span>
          )}
        </code>
      </pre>
    </div>
  );
}
