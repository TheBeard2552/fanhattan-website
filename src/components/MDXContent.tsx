import { MDXRemote } from 'next-mdx-remote/rsc';

interface MDXContentProps {
  source: string;
}

export default async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
