interface TagBadgeProps {
  children: string;
  className?: string;
}

export default function TagBadge({ children, className = '' }: TagBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-xs font-display uppercase tracking-wide
        rounded-full
        bg-platform/10 text-platform border border-platform/20
        ${className}
      `}
    >
      {children}
    </span>
  );
}
