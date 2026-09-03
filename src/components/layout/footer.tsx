import Link from "next/link";
import {
  FacebookIcon,
  WhatsappIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { Logo } from "@/components/layout/logo";
import { Newsletter } from "@/components/layout/newsletter";
import { dict } from "@/data/dictionary";
import { site } from "@/data/site";

export function Footer() {
  const t = dict.footer;

  const explore = [
    { href: "/about", label: dict.nav.about },
    { href: "/activities", label: dict.nav.work },
    { href: "/gallery", label: dict.nav.gallery },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contact", label: dict.nav.contact },
  ];

  const support = [
    { href: "/donate", label: "Donate now" },
    { href: "/donate", label: "Donation accounts" },
    { href: "/donate", label: "Request a receipt" },
    { href: "/get-involved", label: "Volunteer" },
  ];

  return (
    <footer>
      <div className="border-t-4 border-accent bg-ink text-white/80">
        {/* Newsletter strip */}
        <div className="border-b border-white/10">
          <div className="container-site">
            <Newsletter />
          </div>
        </div>

        {/* Main grid */}
        <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={dict.nav.home}>
              <Logo height={30} />
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">
              {t.mission}
            </p>
            <p className="mt-6 text-xs font-semibold text-white/40">
              {dict.trust.registered}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href={site.socials.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </Social>
              <Social href={site.socials.whatsapp} label="WhatsApp">
                <WhatsappIcon className="h-4 w-4" />
              </Social>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <FooterColumn title={t.menu} links={explore} />
          </div>

          {/* Support */}
          <div className="lg:col-span-3">
            <FooterColumn title={t.donate} links={support} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-xs font-bold text-white/40">
              {t.contact}
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="leading-6 text-white/75">{site.address}</li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/75 transition hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneDisplay}`}
                  dir="ltr"
                  className="text-white/75 transition hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 md:flex-row">
            <p>{t.copyright}</p>
            <p>
              {site.name} · Reg. No. {site.regNo}
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-white"
            >
              Back to top
              <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-primary hover:bg-primary hover:text-white"
    >
      {children}
    </a>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold text-white/40">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
