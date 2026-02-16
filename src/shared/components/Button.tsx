import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  href, 
  onClick,
  className = '',
  ...buttonProps
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    px-8 py-3
    font-display uppercase tracking-wide text-sm
    rounded-lg
    transition-all duration-200
    active:translate-y-0.5
    ${className}
  `;
  
  const variantClasses = {
    primary: `
      bg-platform text-white
      shadow-lg shadow-platform/30
      hover:shadow-xl hover:shadow-platform/40 hover:-translate-y-0.5
    `,
    secondary: `
      border-2 border-sand text-sand
      hover:bg-sand/10 hover:-translate-y-0.5
    `,
    ghost: `
      text-foreground
      hover:bg-muted hover:-translate-y-0.5
    `,
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
