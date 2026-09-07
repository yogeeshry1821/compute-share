"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ListIcon } from "@phosphor-icons/react";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

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
        <Button>Sign up</Button>
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
            <Button onClick={() => setOpen(false)}>Sign up</Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
