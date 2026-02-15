'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to send verification email');
      } else {
        setStatus('success');
        setMessage('Check your email for the login link!');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="border border-border rounded-lg bg-card p-8 shadow-xl">
          <h1 className="text-3xl font-display uppercase tracking-wide text-platform mb-2">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email to get started. We&apos;ll send you a magic link to sign in.
          </p>

          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-md bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-platform focus:border-transparent"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && message && (
                <p className="text-sm text-red-500">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-4 font-display uppercase tracking-wide text-sm bg-platform text-background rounded-md hover:bg-platform/90 focus:outline-none focus:ring-2 focus:ring-platform focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Continue with Email'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-platform/10 border border-platform/20">
                <p className="text-sm text-platform">{message}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-platform hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-platform transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
