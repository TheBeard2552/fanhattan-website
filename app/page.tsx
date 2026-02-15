import type { Metadata } from 'next';
import Image from 'next/image';
import Section from '@/components/Section';
import Button from '@/components/Button';
import CollectibleCard from '@/components/CollectibleCard';
import ModeCard from '@/components/ModeCard';
import EmailForm from '@/components/EmailForm';

export const metadata: Metadata = {
  title: 'Bagged Up - A Collectible Universe',
  description: 'Compete. Unlock. Collect. Repeat. Welcome to Fanhattan.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20" container={false}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wide mb-6">
              Welcome to Fanhattan
            </h1>
            <h2 className="text-2xl md:text-3xl text-sand mb-4">
              A collectible universe powered by belief and competition.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Compete. Unlock. Collect. Repeat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" href="/play">
                Enter the City
              </Button>
              <Button variant="secondary" href="/play">
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Collect the City Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6">
              Collect the City
            </h2>
            <div className="max-w-2xl mx-auto space-y-2 text-lg text-muted-foreground">
              <p>Every win unlocks something.</p>
              <p>Every streak builds status.</p>
              <p>Every district has its own legends.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <CollectibleCard
              title="District Badge"
              description="Unlock unique badges for each district you conquer."
              rarity="rare"
              placeholder={
                <Image
                  src="/images/district-badge.png"
                  alt="District Badge - Unlock unique badges for each district"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              }
            />
            <CollectibleCard
              title="Streak Crown"
              description="Crown your achievements with legendary streak rewards."
              rarity="legendary"
              placeholder={
                <Image
                  src="/images/streak-crown.png"
                  alt="Streak Crown - Legendary achievement"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              }
            />
            <CollectibleCard
              title="Legacy Card"
              description="Collect mythical cards that define your legacy in Fanhattan."
              rarity="mythical"
              placeholder={
                <Image
                  src="/images/legacy-card.png"
                  alt="Legacy Card - Spirit of Sals"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              }
            />
          </div>
        </div>
      </Section>

      {/* Game Modes Section */}
      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide">
              Earn Your Status
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModeCard
              mode="billy"
              title="Billy's Big Streak"
              description="The heat is on. Can you handle the pressure when every play matters?"
              icon="🔥"
            />
            <ModeCard
              mode="super"
              title="Super Streak"
              description="Electric energy. Climb the leaderboard and prove you're the best."
              icon="⚡"
            />
            <ModeCard
              mode="expansion"
              title="Expansion Modes"
              description="New challenges await. The city grows with every season."
              icon="🌟"
            />
          </div>
        </div>
      </Section>

      {/* Lore Preview Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6">
            The World of Fanhattan
          </h2>
          <div className="space-y-3 text-lg text-muted-foreground mb-8">
            <p>This isn&apos;t just a game.</p>
            <p className="text-2xl text-sand">It&apos;s a city.</p>
          </div>
          <Button variant="primary" href="/lore">
            Explore the Canon
          </Button>
        </div>
      </Section>

      {/* Email Section */}
      <Section className="bg-card border-y-2 border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display uppercase tracking-wide mb-6">
            Join the City
          </h2>
          <p className="text-muted-foreground mb-6">
            Get early access, drops, and exclusive collectibles delivered to your inbox.
          </p>
          <EmailForm />
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Section>
    </>
  );
}
