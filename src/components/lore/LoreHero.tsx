import { ReactNode } from 'react';

interface LoreHeroProps {
  headline: string;
  subtext?: string;
  children?: ReactNode;
}

export default function LoreHero({ headline, subtext, children }: LoreHeroProps) {
  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-platform/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide mb-6">
            {headline}
          </h1>
          {subtext && (
            <p className="text-xl text-muted-foreground">
              {subtext}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
