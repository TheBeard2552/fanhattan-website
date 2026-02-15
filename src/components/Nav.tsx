import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-display uppercase tracking-wide text-platform">
            BAGGED UP
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              href="/play" 
              className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
            >
              Play
            </Link>
            {/* Collection tab hidden for now
            <Link 
              href="/collection" 
              className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
            >
              Collection
            </Link>
            */}
            <Link 
              href="/lore" 
              className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
            >
              Lore
            </Link>
            <Link 
              href="/shop" 
              className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
            >
              Shop
            </Link>
            {user ? (
              <Link 
                href="/account" 
                className="text-sm font-display uppercase tracking-wide bg-platform text-background px-4 py-2 rounded-md hover:bg-platform/90 transition-colors"
              >
                Account
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
