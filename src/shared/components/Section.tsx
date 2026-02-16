import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  container?: boolean;
}

export default function Section({ children, id, className = '', container = true }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : children}
    </section>
  );
}
