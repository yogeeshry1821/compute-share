"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ListIcon, SignOut, User } from "@phosphor-icons/react";
import { useAuth } from "@/components/auth/auth-provider";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { session, isLoading } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <span className="font-mono text-sm">compute-share</span>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground">
            {link.label}
          </Link>
        ))}
        {isLoading ? (
          <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
        ) : session ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <User className="mr-2 size-4" />
                {session.user.name || session.user.email}
              </Button>
            </Link>
            <form action="/api/auth/sign-out" method="POST">
              <Button type="submit" variant="ghost" size="sm">
                <SignOut className="mr-2 size-4" />
                Sign out
              </Button>
            </form>
          </div>
        ) : (
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden" aria-label="Open menu">
          <ListIcon size={24} />
        </SheetTrigger>
        <SheetContent side="right">
          <div className="mt-8 flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base">
                {link.label}
              </Link>
            ))}
            {isLoading ? (
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            ) : session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button className="w-full">
                    <User className="mr-2 size-4" />
                    Dashboard
                  </Button>
                </Link>
                <form action="/api/auth/sign-out" method="POST">
                  <Button type="submit" variant="outline" className="w-full">
                    <SignOut className="mr-2 size-4" />
                    Sign out
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full">Sign in</Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
