import CodeBlockClient from "@/components/CodeBlockClient";
import { urlFor } from "@/sanity/client";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

export const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h3>{children}</h3>,
    h5: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)
        .width(1200)
        .height(675)
        .fit("max")
        .auto("format")
        .url();

      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Article image"}
            width={1200}
            height={675}
            className="h-auto w-full rounded-2xl border border-line object-cover"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-center text-[12px] text-ink-muted">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <CodeBlockClient
        code={value.code}
        language={value.language}
        title={value.title}
        showLineNumbers={value.showLineNumbers}
      />
    ),
  },
};
