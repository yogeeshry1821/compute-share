export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border px-8 py-24">
      <h2 className="text-2xl font-medium">Pricing</h2>

      <div className="mt-8 flex flex-col items-start gap-2">
        <p className="font-mono text-4xl">Pay per hour</p>
        <p className="max-w-md text-sm text-muted-foreground">
          No subscriptions, no minimums. Renters pay only for compute time
          used. Providers set their own hourly rate and keep the majority of
          what they earn.
        </p>
      </div>
    </section>
  );
}
