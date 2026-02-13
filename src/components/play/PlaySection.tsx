import { ReactNode } from 'react';
import Section from '@/components/Section';

interface PlaySectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  headline?: string;
  subheadline?: string;
  containerSize?: 'default' | 'narrow' | 'wide';
}

export default function PlaySection({ 
  children, 
  id, 
  className = '', 
  headline,
  subheadline,
  containerSize = 'default'
}: PlaySectionProps) {
  const containerClasses = {
    default: 'max-w-6xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-7xl',
  };

  return (
    <Section id={id} className={className}>
      <div className={`mx-auto ${containerClasses[containerSize]}`}>
        {(headline || subheadline) && (
          <div className="text-center mb-12">
            {headline && (
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </Section>
  );
}
