import FeedbackForm from '@/components/FeedbackForm';

export const metadata = {
  title: 'Report an Incident | Bagged Up',
  description: 'Tell the city what happened. Your feedback helps shape Fanhattan.',
};

export default function IncidentPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display uppercase tracking-wide text-platform mb-4">
            Report an Incident
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Found a bug? Have an idea? Tell us what happened. Every report gets
            reviewed and discussed by the community.
          </p>
        </div>

        <FeedbackForm />

        <div className="mt-8 p-6 border border-border rounded-lg bg-muted/50">
          <h2 className="text-xl font-display uppercase tracking-wide mb-4">
            What Happens Next?
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="text-platform mr-2">1.</span>
              <span>
                Your incident is logged and assigned an ID (like FAN-0231)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-platform mr-2">2.</span>
              <span>
                A discussion thread is created automatically in our Discord
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-platform mr-2">3.</span>
              <span>
                The community reacts with 🔥 (Want), 💯 (Must Have), 🐞 (Bug),
                or 🧠 (Idea)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-platform mr-2">4.</span>
              <span>
                Popular reports (10+ votes) get officially reviewed and
                prioritized
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
