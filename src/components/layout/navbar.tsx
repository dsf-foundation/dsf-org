"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon, ArrowRightIcon } from "@/components/icons/ui";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { dict } from "@/data/dictionary";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const t = dict.nav;
  const donateLabel = dict.actions.donate;

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const items: { href: string; label: string }[] = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/activities", label: t.work },
    { href: "/blog", label: t.blog },
    { href: "/gallery", label: t.gallery },
    { href: "/get-involved", label: t.getInvolved },
    { href: "/contact", label: t.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper shadow-xl`}
    >
      <div
        className={`container-site flex items-center justify-between gap-4 transition-all duration-300 h-16`}
      >
        <Link
          href="/"
          aria-label={t.home}
          className="shrink-0"
        >
          <Logo height={32} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`px-3 py-2 text-sm font-semibold transition-colors lg:text-sm ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-body hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            href="/donate"
            size="sm"
            variant="accent"
            className="hidden md:inline-flex"
          >
            {donateLabel}
          </Button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink transition hover:bg-surface lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-paper shadow-float">
            <div className="flex items-center justify-between border-b border-line p-5">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-ink transition hover:bg-surface"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`my-0.5 flex items-center justify-between px-4 py-3 text-lg font-semibold transition ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-ink hover:bg-surface"
                    }`}
                  >
                    {item.label}
                    <ArrowRightIcon className="h-4 w-4 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-5">
              <Button href="/donate" className="w-full" size="lg">
                {donateLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
