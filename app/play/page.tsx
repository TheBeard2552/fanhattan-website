import type { Metadata } from 'next';
import Button from '@/shared/components/Button';
import PlaySection from '@/features/play/components/PlaySection';
import ModeBlock from '@/features/play/components/ModeBlock';
import StepCard from '@/features/play/components/StepCard';
import DownloadButtons from '@/features/play/components/DownloadButtons';

export const metadata: Metadata = {
  title: 'How to Play — Bagged Up',
  description: 'Learn how Billy\'s Big Streak and Super Streak work. Compete, unlock collectibles, and explore the world of Fanhattan.',
};

export default function PlayPage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <PlaySection className="pt-32 pb-20" containerSize="narrow">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide mb-6">
            HOW YOU COMPETE IN FANHATTAN
          </h1>
          <p className="text-2xl md:text-3xl text-sand mb-8">
            Two modes. One city. Earn your status.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" href="#">
              DOWNLOAD THE APP
            </Button>
            <Button variant="secondary" href="/lore">
              VIEW COLLECTION
            </Button>
          </div>

          <DownloadButtons />
        </div>
      </PlaySection>

      {/* SECTION 2 — GAME MODES OVERVIEW */}
      <PlaySection 
        headline="CHOOSE YOUR PRESSURE"
        containerSize="default"
        className="bg-muted/20"
      >
        <p className="text-center text-lg text-foreground/90 mb-12 max-w-3xl mx-auto">
          Bagged Up is built around belief under pressure. Each mode rewards a different kind of competitor.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MODE BLOCK 1 — BILLY'S BIG STREAK */}
          <ModeBlock
            mode="billy"
            headline="BILLY'S BIG STREAK"
            subheadline="One pick per day. No resets."
            body={[
              'You make one pick.',
              'Win, and the streak grows.',
              'Lose, and it\'s over.',
              '',
              'The longer you survive, the more Heat you earn.',
              '',
              'Heat unlocks exclusive collectibles and seasonal rewards.',
            ]}
          />

          {/* MODE BLOCK 2 — SUPER STREAK */}
          <ModeBlock
            mode="super"
            headline="SUPER STREAK"
            subheadline="Weekly contests. Leaderboard competition."
            body={[
              'Make multiple picks across the week.',
              'Climb the leaderboard.',
              'Compete against the entire city.',
              '',
              'Top performers unlock exclusive rewards and limited drops.',
            ]}
          />
        </div>
      </PlaySection>

      {/* SECTION 3 — HOW PROGRESSION WORKS */}
      <PlaySection 
        headline="COMPETE. UNLOCK. COLLECT."
        containerSize="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="COMPETE"
            description="Make picks in your chosen mode."
          />
          <StepCard
            number="2"
            title="EARN"
            description="Win streaks. Climb leaderboards. Unlock rewards."
          />
          <StepCard
            number="3"
            title="COLLECT"
            description="Expand your archive with skins, bag variants, and seasonal drops."
          />
        </div>
      </PlaySection>

      {/* SECTION 4 — WHY IT'S DIFFERENT */}
      <PlaySection 
        headline="NOT JUST PICKS. A UNIVERSE."
        containerSize="narrow"
        className="bg-muted/20"
      >
        <div className="text-center space-y-4 text-lg text-foreground/90">
          <p>Bagged Up connects competition to collectibles.</p>
          <p>Collectibles connect to lore.</p>
          <p>Lore connects to the city.</p>
          <p className="text-xl text-sand pt-4">
            Your performance shapes your archive.
          </p>
        </div>
      </PlaySection>

      {/* SECTION 5 — FINAL CTA */}
      <PlaySection 
        headline="ENTER THE CITY"
        containerSize="narrow"
      >
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="#">
              DOWNLOAD THE APP
            </Button>
            <Button variant="secondary" href="/lore">
              EXPLORE THE LORE
            </Button>
          </div>
        </div>
      </PlaySection>
    </>
  );
}
