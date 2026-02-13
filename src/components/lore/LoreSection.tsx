import { ReactNode } from 'react';
import Section from '../Section';

interface LoreSectionProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
}

export default function LoreSection({ children, className = '', container = true }: LoreSectionProps) {
  return (
    <Section className={className} container={container}>
      {children}
    </Section>
  );
}
