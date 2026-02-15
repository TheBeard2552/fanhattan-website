import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect('/login');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user profile from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="border border-border rounded-lg bg-card p-8 shadow-xl">
          <h1 className="text-3xl font-display uppercase tracking-wide text-platform mb-6">
            Your Account
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-2">
                Email
              </h2>
              <p className="text-foreground">{user.email || 'No email'}</p>
            </div>

            {profile?.display_name && (
              <div>
                <h2 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-2">
                  Display Name
                </h2>
                <p className="text-foreground">{profile.display_name}</p>
              </div>
            )}

            <div>
              <h2 className="text-sm font-display uppercase tracking-wide text-muted-foreground mb-2">
                Member Since
              </h2>
              <p className="text-foreground">
                {new Date(profile?.created_at || user.created_at || '').toLocaleDateString()}
              </p>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="w-full py-3 px-4 font-display uppercase tracking-wide text-sm border-2 border-border text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  Sign Out
                </button>
              </form>

              <Link
                href="/"
                className="block w-full py-3 px-4 text-center font-display uppercase tracking-wide text-sm text-muted-foreground hover:text-platform transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 border border-border rounded-lg bg-muted/50">
          <h2 className="text-xl font-display uppercase tracking-wide mb-4">
            Coming Soon
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• View your collection</li>
            <li>• Track your streaks</li>
            <li>• Manage your profile</li>
            <li>• Connect with other players</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
