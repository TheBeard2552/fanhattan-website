import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', href, hover = true }: CardProps) {
  const baseClasses = `bg-card border-2 border-border rounded-lg overflow-hidden ${hover ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-platform/50' : ''} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
