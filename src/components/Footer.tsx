import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-display text-primary mb-4">
              FANHATTAN
            </h3>
            <p className="text-sm text-muted-foreground">
              A universe of stories, characters, and mysteries waiting to be discovered.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Game</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/play" className="hover:text-foreground transition-colors">Download</Link></li>
              <li><Link href="/play" className="hover:text-foreground transition-colors">System Requirements</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Lore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/lore/characters" className="hover:text-foreground transition-colors">Characters</Link></li>
              <li><Link href="/lore/districts" className="hover:text-foreground transition-colors">Districts</Link></li>
              <li><Link href="/lore/artifacts" className="hover:text-foreground transition-colors">Artifacts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fanhattan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
