import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="border border-border rounded-lg bg-card p-8 shadow-xl">
          <h1 className="text-2xl font-display uppercase tracking-wide text-red-500 mb-4">
            Authentication Error
          </h1>
          <p className="text-foreground mb-6">
            There was a problem verifying your email link. This can happen if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-6">
            <li>The link has expired</li>
            <li>The link has already been used</li>
            <li>The link was incomplete or modified</li>
          </ul>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full py-3 px-4 text-center font-display uppercase tracking-wide text-sm bg-platform text-background rounded-md hover:bg-platform/90 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full py-3 px-4 text-center font-display uppercase tracking-wide text-sm text-muted-foreground hover:text-platform transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
