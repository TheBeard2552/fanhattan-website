import Card from '@/components/Card';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="p-8 text-center" hover={false}>
      <div className="mb-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-platform/20 text-platform text-xl font-display">
          {number}
        </span>
      </div>
      <h3 className="text-2xl font-display uppercase tracking-wide mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}
