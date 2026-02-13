'use client';

import Button from './Button';

export default function EmailForm() {
  return (
    <form 
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 border-2 border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-platform"
        required
      />
      <Button variant="primary">
        Join
      </Button>
    </form>
  );
}
