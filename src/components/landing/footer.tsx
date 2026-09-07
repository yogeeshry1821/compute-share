import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-8 py-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="font-mono text-sm text-muted-foreground">
          compute-share
        </span>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="#how-it-works">How it works</Link>
          <Link href="#pricing">Pricing</Link>
        </div>
        <span className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} compute-share
        </span>
      </div>
    </footer>
  );
}
