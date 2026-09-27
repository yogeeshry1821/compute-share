export default function ProfilePage() {
  return (
    <div className="px-6 py-8">
      <div className="pb-6 mb-6 border-b border-border">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          Profile settings will be available once user management is fully
          implemented in Step 3.
        </p>
      </div>
    </div>
  );
}
