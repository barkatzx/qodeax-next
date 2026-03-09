import CodeBlockClient from "@/components/CodeBlockClient"; // Make sure this import path is correct
import { urlFor } from "@/sanity/client";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

export const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-[Recoleta] text-5xl font-bold mt-12 mb-4 leading-tight text-white/90">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-[Recoleta] text-4xl font-bold mt-10 mb-3 leading-snug text-white/90">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[Recoleta] text-3xl font-bold mt-8 mb-3 leading-snug text-white/90">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-[Recoleta] text-2xl font-bold mt-6 mb-2 leading-snug text-white/90">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-[Recoleta] text-xl font-bold mt-6 mb-2 leading-snug text-white/90">
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p className="text-xl leading-relaxed mb-5 text-white/90">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00a8ff] pl-5 my-6 text-white/70 italic text-xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="text-[#00a8ff] underline underline-offset-2 hover:text-[#4dc3ff] transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-5 mt-2 space-y-2 text-xl text-white/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-5 mt-2 space-y-2 text-xl text-white/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-xl leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-xl leading-relaxed">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)
        .width(1200)
        .height(600)
        .fit("max")
        .auto("format")
        .url();

      if (!imageUrl) return null;

      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Sanity Image"}
            width={1200}
            height={600}
            className="rounded-2xl w-full h-auto object-cover border border-white/10"
          />
          {value.caption && (
            <p className="text-sm text-white/50 mt-2 italic">{value.caption}</p>
          )}
        </div>
      );
    },
    // Add the codeBlock type handler
    codeBlock: ({ value }) => {
      return (
        <CodeBlockClient
          code={value.code}
          language={value.language}
          title={value.title}
          showLineNumbers={value.showLineNumbers}
        />
      );
    },
  },
};
