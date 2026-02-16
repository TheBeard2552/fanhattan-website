import { ReactNode } from 'react';

interface ModeCardProps {
  mode: 'billy' | 'super' | 'expansion';
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function ModeCard({ mode, title, description, icon }: ModeCardProps) {
  const modeStyles = {
    billy: {
      border: 'border-mode-billy-heat',
      glow: 'shadow-mode-billy-heat/30 hover:shadow-mode-billy-heat/50',
      accent: 'text-mode-billy-heat',
      bg: 'bg-mode-billy-heat/5',
    },
    super: {
      border: 'border-mode-super-electric',
      glow: 'shadow-mode-super-electric/30 hover:shadow-mode-super-electric/50',
      accent: 'text-mode-super-electric',
      bg: 'bg-mode-super-electric/5',
    },
    expansion: {
      border: 'border-border',
      glow: '',
      accent: 'text-sand',
      bg: 'bg-card',
    },
  };
  
  const style = modeStyles[mode];
  
  return (
    <div 
      className={`
        ${style.bg} border-2 ${style.border}
        rounded-lg overflow-hidden p-8
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl ${style.glow}
      `}
    >
      <div className="flex flex-col items-center text-center">
        {icon && (
          <div className="text-6xl mb-4">
            {icon}
          </div>
        )}
        <h3 className={`text-2xl font-display uppercase tracking-wide mb-3 ${style.accent}`}>
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
