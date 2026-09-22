"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, SignOut } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/auth-provider";

const navItems = [
  { href: "/dashboard/machines", label: "Machines" },
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/billing", label: "Billing" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          <div className="border-b border-border px-6 py-4">
            <span className="font-mono text-sm">compute-share</span>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <User className="size-4 text-primary" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {session?.user?.name || session?.user?.email || "User"}
                </p>
              </div>
            </div>
            <form action="/api/auth/sign-out" method="POST">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full">
                <SignOut className="mr-2 size-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-[65%] border-x border-border bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
