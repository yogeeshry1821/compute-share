export default function MachinesPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold tracking-tight">Machines</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your compute machines and their status.
      </p>
      <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No machines configured yet. This page will show your available
          machines once Prisma and CRUD are wired up in Step 3.
        </p>
      </div>
    </div>
  );
}
