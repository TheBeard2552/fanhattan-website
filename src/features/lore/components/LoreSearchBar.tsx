'use client';

import { useState } from 'react';

interface LoreSearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function LoreSearchBar({ 
  placeholder = "Search...", 
  value: controlledValue,
  onSearch,
  className = '' 
}: LoreSearchBarProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalQuery(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    if (!isControlled) setInternalQuery('');
    onSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-6 py-4 pr-16 bg-white/5 border-2 border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-platform/50 transition-colors font-display uppercase tracking-wide text-sm"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="text-platform hover:text-platform/80 transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
