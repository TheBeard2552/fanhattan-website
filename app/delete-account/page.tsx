import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Delete Account — Bagged Up',
  description: 'Follow these simple steps to delete your Bagged Up account. Account deletion is permanent.',
};

export default function DeleteAccountPage() {
  const steps = [
    {
      number: 1,
      title: 'Navigate to the hamburger menu',
      description: 'Open the Bagged Up app and look for the hamburger menu (three lines) typically located in the top corner of your screen.',
    },
    {
      number: 2,
      title: 'Tap "Profile"',
      description: 'From the hamburger menu, locate and tap on the "Profile" option to access your account settings.',
    },
    {
      number: 3,
      title: 'Tap "delete profile"',
      description: 'In your profile settings, find and tap the "delete profile" option to permanently remove your account.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-platform transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-2">
            Delete Account
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            Follow these simple steps to delete your Bagged Up account
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-8 flex items-center gap-2">
              <span>📱</span> How to Delete Your Account
            </h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-6 p-6 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-platform/20 border-2 border-platform flex items-center justify-center font-display text-xl text-platform">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 p-6 rounded-lg border-2 border-amber-500/50 bg-amber-500/10">
            <h2 className="text-xl font-display uppercase tracking-wide text-amber-400 mb-4 flex items-center gap-2">
              <span>⚠️</span> Important Notice
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Account deletion is permanent. Once you delete your account, all your data, including your Fan Score, achievements, and profile information will be permanently removed and cannot be recovered.
            </p>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Please make sure you really want to delete your account before proceeding with these steps.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-display uppercase tracking-wide text-foreground mb-4 flex items-center gap-2">
              <span>📧</span> Need Help?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions or concerns about how to delete your account, please contact us at:
            </p>
            <a
              href="mailto:info@baggedupstudios.com"
              className="text-platform hover:underline font-medium"
            >
              info@baggedupstudios.com
            </a>
          </section>

          <div className="pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-platform transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
