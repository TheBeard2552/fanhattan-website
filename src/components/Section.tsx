import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
}

export default function Section({ children, className = '', container = true }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : children}
    </section>
  );
}
