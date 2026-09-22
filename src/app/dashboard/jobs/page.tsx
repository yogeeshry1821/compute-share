export default function JobsPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
      <p className="mt-2 text-muted-foreground">
        View and manage your AI training jobs.
      </p>
      <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No jobs yet. This page will show job history and status once Prisma
          and CRUD are wired up in Step 3.
        </p>
      </div>
    </div>
  );
}
