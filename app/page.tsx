import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import EmailCaptureForm from '@/components/EmailCaptureForm';

export const metadata: Metadata = {
  title: 'Fanhattan - A Universe Awaits',
  description: 'Explore the world of Fanhattan through immersive gameplay, deep lore, and exclusive merchandise.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary/10 to-background pt-32 pb-20" container={false}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Fanhattan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              A sprawling metropolis built on forgotten civilizations. A city where technology meets mystery, 
              and every shadow hides a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/play"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Play Now
              </Link>
              <Link 
                href="/lore"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
              >
                Explore the Lore
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* What is the Game Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What is Fanhattan?
          </h2>
          <p className="text-lg text-muted-foreground">
            An immersive action-adventure game set in a cyberpunk metropolis where ancient mysteries 
            collide with cutting-edge technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-semibold mb-2">Dynamic Combat</h3>
            <p className="text-muted-foreground">
              Master multiple fighting styles and legendary artifacts in fast-paced battles against 
              corporate enforcers and ancient threats.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl mb-4">🌆</div>
            <h3 className="text-xl font-semibold mb-2">Explore Districts</h3>
            <p className="text-muted-foreground">
              Navigate through unique districts, from neon-lit tech hubs to mysterious underground ruins, 
              each with its own culture and secrets.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold mb-2">Deep Narrative</h3>
            <p className="text-muted-foreground">
              Uncover the truth behind Fanhattan&apos;s founding, powerful artifacts, and the forces 
              that seek to control them.
            </p>
          </Card>
        </div>
      </Section>

      {/* What is Fanhattan Lore Section */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            The Universe of Fanhattan
          </h2>
          <p className="text-lg text-muted-foreground">
            A rich, living world filled with complex characters, diverse districts, and mysterious artifacts. 
            Every element has a story, and every story shapes the world.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card href="/lore/characters" className="group">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Characters
              </h3>
              <p className="text-muted-foreground text-sm">
                Meet hackers, vigilantes, and enigmatic figures who shape Fanhattan&apos;s destiny.
              </p>
            </div>
          </Card>
          <Card href="/lore/districts" className="group">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-6xl">🏙️</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Districts
              </h3>
              <p className="text-muted-foreground text-sm">
                Explore unique neighborhoods, from high-tech towers to ancient underground ruins.
              </p>
            </div>
          </Card>
          <Card href="/lore/artifacts" className="group">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-6xl">💎</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                Artifacts
              </h3>
              <p className="text-muted-foreground text-sm">
                Discover legendary items with powers that blur the line between technology and magic.
              </p>
            </div>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/lore"
            className="inline-flex items-center text-primary font-semibold hover:underline"
          >
            View All Lore →
          </Link>
        </div>
      </Section>

      {/* Email Capture Section */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest news, lore updates, and exclusive content delivered to your inbox.
            </p>
            <EmailCaptureForm />
            <p className="text-xs text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
