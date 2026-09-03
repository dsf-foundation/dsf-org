import {
  FacebookIcon,
  WhatsappIcon,
} from "@/components/icons";
import { MapPinIcon, PhoneIcon } from "@/components/icons/ui";
import { dict } from "@/data/dictionary";
import { site } from "@/data/site";

export function TopBar() {
  return (
    <div className="bg-primary text-white">
      <div className="container-site flex items-center justify-between gap-4 py-2.5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-semibold text-white/90">
          <span className="inline-flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-accent" />
            {site.topbar.address}
          </span>
          <a
            href={`tel:${site.topbar.phoneHref}`}
            className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-white"
          >
            <PhoneIcon className="h-4 w-4 text-accent" />
            {site.topbar.phoneDisplay}
            <span className="hidden text-white/80 sm:inline">
              {dict.topbar.callNow}
            </span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <TopBarSocial href={site.socials.facebook} label="Facebook">
            <FacebookIcon className="h-4 w-4" />
          </TopBarSocial>
          <TopBarSocial href={site.socials.whatsapp} label="WhatsApp">
            <WhatsappIcon className="h-4 w-4" />
          </TopBarSocial>
        </div>
      </div>
    </div>
  );
}

function TopBarSocial({
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
      className="flex h-8 w-8 items-center justify-center rounded-full  transition bg-white/15 text-white"
    >
      {children}
    </a>
  );
}