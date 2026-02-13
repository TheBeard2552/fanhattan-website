import { CollectibleMode } from '@/../../data/collectibles';

interface ModeTagProps {
  mode: CollectibleMode;
  className?: string;
}

export default function ModeTag({ mode, className = '' }: ModeTagProps) {
  const modeStyles = {
    billy: {
      bg: 'bg-mode-billy-heat/10',
      text: 'text-mode-billy-heat',
      border: 'border-mode-billy-heat/20',
    },
    super: {
      bg: 'bg-mode-super-electric/10',
      text: 'text-mode-super-electric',
      border: 'border-mode-super-electric/20',
    },
    neutral: {
      bg: 'bg-sand/10',
      text: 'text-sand',
      border: 'border-sand/20',
    },
  };
  
  const modeLabels = {
    billy: "Billy's Big Streak",
    super: 'Super Streak',
    neutral: 'Seasonal',
  };
  
  const style = modeStyles[mode];
  
  return (
    <span 
      className={`
        inline-flex items-center
        px-2 py-0.5
        text-xs font-display uppercase tracking-wide
        rounded
        border
        ${style.bg} ${style.text} ${style.border}
        ${className}
      `}
    >
      {modeLabels[mode]}
    </span>
  );
}
