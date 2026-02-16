interface CanonTierBadgeProps {
  tier: 1 | 2 | 3 | "tier-1" | "tier-2" | "tier-3";
}

const tierConfig = {
  1: {
    label: 'TIER 1 CANON',
    className: 'bg-platform/20 border-platform text-platform',
    description: 'Immutable core canon',
  },
  2: {
    label: 'TIER 2 CANON',
    className: 'bg-orange-500/20 border-orange-500 text-orange-500',
    description: 'Established canon',
  },
  3: {
    label: 'TIER 3 CANON',
    className: 'bg-yellow-500/20 border-yellow-500 text-yellow-500',
    description: 'Evolving canon',
  },
};

export function CanonTierBadge({ tier }: CanonTierBadgeProps) {
  // Normalize tier format
  const tierNum = typeof tier === 'string' ? parseInt(tier.split('-')[1]) as 1 | 2 | 3 : tier;
  const config = tierConfig[tierNum];
  
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full border-2 font-display text-xs uppercase tracking-wider ${config.className}`}
      title={config.description}
    >
      {config.label}
    </div>
  );
}

export default CanonTierBadge;
