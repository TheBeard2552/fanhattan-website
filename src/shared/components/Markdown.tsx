import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
  className?: string;
}

export default async function Markdown({ content, className = '' }: MarkdownProps) {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  
  const contentHtml = processedContent.toString();
  
  return (
    <div
      className={`prose prose-invert prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
