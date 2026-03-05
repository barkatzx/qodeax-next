"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

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
  showLineNumbers = false 
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.split('\n');

  return (
    <div className="relative group my-8">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-[agave] text-white/60">{title}</h4>
          <div className="text-lg px-2 py-1 bg-[#031119] border border-white/10 rounded text-white/50 font-[agave]">
            {language}
          </div>
        </div>
      )}
      
      {!title && (
        <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 bg-[#031119] border border-white/10 rounded-lg text-lg text-white/50 font-[agave] z-10">
          {language}
        </div>
      )}
      
      <pre className="bg-[#031119] rounded-xl p-4 overflow-x-auto border border-white/10">
        <code className="font-[agave] text-lg text-[#4dc3ff] block">
          {showLineNumbers ? (
            <table className="border-collapse w-full">
              <tbody>
                {codeLines.map((line, index) => (
                  <tr key={index} className="leading-6">
                    <td className="text-right pr-4 select-none text-white/30 text-lg w-8 align-top">
                      {index + 1}
                    </td>
                    <td className="whitespace-pre font-[agave]">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="whitespace-pre-wrap">{code}</div>
          )}
        </code>
      </pre>
      
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <FiCheck className="text-green-400" size={18} />
        ) : (
          <FiCopy className="text-white/70" size={18} />
        )}
      </button>
    </div>
  );
}