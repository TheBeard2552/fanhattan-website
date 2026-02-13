interface DownloadButtonsProps {
  className?: string;
}

export default function DownloadButtons({ className = '' }: DownloadButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center ${className}`}>
      {/* App Store Button */}
      <a 
        href="#" 
        className="inline-flex items-center gap-3 px-6 py-3 bg-card border-2 border-border rounded-lg hover:border-platform/50 transition-all duration-200 hover:-translate-y-0.5"
        aria-label="Download on the App Store"
      >
        <div className="text-3xl">
          
        </div>
        <div className="text-left">
          <div className="text-xs text-muted-foreground">Download on the</div>
          <div className="text-lg font-display uppercase tracking-wide">App Store</div>
        </div>
      </a>

      {/* Google Play Button */}
      <a 
        href="#" 
        className="inline-flex items-center gap-3 px-6 py-3 bg-card border-2 border-border rounded-lg hover:border-platform/50 transition-all duration-200 hover:-translate-y-0.5"
        aria-label="Get it on Google Play"
      >
        <div className="text-3xl">
          ▶
        </div>
        <div className="text-left">
          <div className="text-xs text-muted-foreground">Get it on</div>
          <div className="text-lg font-display uppercase tracking-wide">Google Play</div>
        </div>
      </a>
    </div>
  );
}
