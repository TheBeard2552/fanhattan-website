interface ModeBlockProps {
  mode: 'billy' | 'super';
  headline: string;
  subheadline: string;
  body: string[];
}

export default function ModeBlock({ mode, headline, subheadline, body }: ModeBlockProps) {
  const styles = {
    billy: {
      border: 'border-mode-billy-heat/30',
      accentLine: 'bg-mode-billy-heat',
      glow: 'shadow-lg shadow-mode-billy-heat/20',
      headlineColor: 'text-mode-billy-heat',
      bg: 'bg-mode-billy-heat/5',
    },
    super: {
      border: 'border-mode-super-electric/30',
      accentLine: 'bg-mode-super-electric',
      glow: 'shadow-lg shadow-mode-super-electric/20',
      headlineColor: 'text-mode-super-electric',
      bg: 'bg-mode-super-electric/5',
    },
  };

  const style = styles[mode];

  return (
    <div className={`relative ${style.bg} border-2 ${style.border} rounded-lg overflow-hidden ${style.glow}`}>
      {/* Subtle accent line */}
      <div className={`h-1 ${style.accentLine}`} />
      
      <div className="p-8 md:p-10">
        <h3 className={`text-3xl md:text-4xl font-display uppercase tracking-wide mb-3 ${style.headlineColor}`}>
          {headline}
        </h3>
        <p className="text-xl text-sand mb-6">
          {subheadline}
        </p>
        <div className="space-y-3 text-foreground/90">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
