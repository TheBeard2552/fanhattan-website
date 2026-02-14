import { PortableText as SanityPortableText, PortableTextComponents } from 'next-sanity';
import { PortableTextBlock } from 'next-sanity';

interface PortableTextProps {
  value: PortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-display uppercase tracking-wide mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display uppercase tracking-wide mb-3 mt-6">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-foreground/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-platform pl-4 italic my-6 text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function PortableText({ value }: PortableTextProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
