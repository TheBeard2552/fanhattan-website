import type { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Play Fanhattan - Download & System Requirements',
  description: 'Download Fanhattan and start your journey through the neon-lit streets and ancient ruins of the most mysterious city ever built.',
};

export default function PlayPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary/10 to-background pt-32 pb-20" container={false}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Enter Fanhattan
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Download the game and begin your adventure through a world where technology 
              meets mystery.
            </p>
            <button className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Download for PC
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              Available for Windows, macOS, and Linux
            </p>
          </div>
        </div>
      </Section>

      {/* System Requirements */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            System Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Minimum</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">OS</dt>
                  <dd>Windows 10 64-bit / macOS 11 / Ubuntu 20.04</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Processor</dt>
                  <dd>Intel Core i5-8400 / AMD Ryzen 5 2600</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Memory</dt>
                  <dd>8 GB RAM</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Graphics</dt>
                  <dd>NVIDIA GTX 1060 / AMD RX 580</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Storage</dt>
                  <dd>50 GB available space</dd>
                </div>
              </dl>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Recommended</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">OS</dt>
                  <dd>Windows 11 64-bit / macOS 13 / Ubuntu 22.04</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Processor</dt>
                  <dd>Intel Core i7-10700K / AMD Ryzen 7 3700X</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Memory</dt>
                  <dd>16 GB RAM</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Graphics</dt>
                  <dd>NVIDIA RTX 3070 / AMD RX 6800 XT</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm text-muted-foreground">Storage</dt>
                  <dd>50 GB SSD</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            Game Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">🎮 Single Player Campaign</h3>
              <p className="text-muted-foreground text-sm">
                Experience a 20+ hour narrative-driven campaign with multiple endings based on your choices.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">🌐 Online Co-op</h3>
              <p className="text-muted-foreground text-sm">
                Team up with friends for special co-op missions and challenges.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">🎨 Character Customization</h3>
              <p className="text-muted-foreground text-sm">
                Create your unique character with extensive customization options and skill trees.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">🗺️ Open World</h3>
              <p className="text-muted-foreground text-sm">
                Freely explore Fanhattan&apos;s diverse districts, from towering skyscrapers to ancient ruins.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">⚙️ Dynamic Combat</h3>
              <p className="text-muted-foreground text-sm">
                Switch between multiple combat styles and use powerful artifacts to overcome challenges.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">📱 Cross-Platform</h3>
              <p className="text-muted-foreground text-sm">
                Play seamlessly across PC platforms with cloud saves and cross-platform progression.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of players already exploring the mysteries of Fanhattan.
          </p>
          <button className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Download Now
          </button>
        </div>
      </Section>
    </>
  );
}
