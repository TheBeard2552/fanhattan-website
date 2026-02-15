'use client';

import { useState } from 'react';

interface LoreSearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function LoreSearchBar({ 
  placeholder = "Search...", 
  onSearch,
  className = '' 
}: LoreSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-platform/50 transition-colors font-display uppercase tracking-wide text-sm"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-platform hover:text-platform/80 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}
