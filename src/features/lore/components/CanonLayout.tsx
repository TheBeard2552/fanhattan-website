import { ReactNode } from 'react';

interface CanonLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function CanonLayout({ children, className = '' }: CanonLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#0e0e0e]">
      {/* Subtle grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  );
}
