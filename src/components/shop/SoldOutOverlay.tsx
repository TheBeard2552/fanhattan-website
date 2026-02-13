export default function SoldOutOverlay() {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
      <span className="text-2xl font-display uppercase tracking-wider text-muted-foreground">
        Sold Out
      </span>
    </div>
  );
}
