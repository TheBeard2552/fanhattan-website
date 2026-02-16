import { DropType, Mode } from '@/features/shop/data/products';

interface DropBadgeProps {
  dropType: DropType;
  mode?: Mode;
  className?: string;
}

export default function DropBadge({ dropType, mode, className = '' }: DropBadgeProps) {
  if (dropType === 'standard') {
    return null;
  }

  // Mode-specific accent colors (only show if mode is present)
  const modeAccent = mode === 'billy' 
    ? 'border-l-4 border-l-mode-billy-heat' 
    : mode === 'super' 
    ? 'border-l-4 border-l-mode-super-electric'
    : '';

  const badgeStyles = dropType === 'limited'
    ? 'bg-platform/20 text-platform border-platform/30'
    : 'bg-sand/10 text-sand border-sand/30';

  return (
    <span 
      className={`
        inline-flex items-center
        px-3 py-1.5
        text-xs font-display uppercase tracking-wider
        border rounded-md
        ${badgeStyles}
        ${modeAccent}
        ${className}
      `}
    >
      {dropType === 'limited' ? 'Limited' : 'Seasonal'}
    </span>
  );
}
