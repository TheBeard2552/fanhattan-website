import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold font-display text-primary">
            FANHATTAN
          </Link>
          <div className="flex items-center gap-8">
            <Link 
              href="/play" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Play
            </Link>
            <Link 
              href="/lore" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Lore
            </Link>
            <Link 
              href="/shop" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
