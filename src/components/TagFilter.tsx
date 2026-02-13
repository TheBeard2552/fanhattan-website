'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
  currentTag?: string;
}

export default function TagFilter({ tags, currentTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    if (currentTag === tag) {
      // Remove tag filter
      router.push(window.location.pathname);
    } else {
      // Add tag filter
      const params = new URLSearchParams(searchParams);
      params.set('tag', tag);
      router.push(`${window.location.pathname}?${params.toString()}`);
    }
  };

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <span className="text-sm text-muted-foreground self-center">Filter by tag:</span>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            currentTag === tag
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {tag}
        </button>
      ))}
      {currentTag && (
        <button
          onClick={() => router.push(window.location.pathname)}
          className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
