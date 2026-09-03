import { site } from "@/data/site";
import { WhatsappIcon } from "@/components/icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={site.socials.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-white/90 py-2 pl-3 pr-4 ring-1 ring-line shadow-soft backdrop-blur transition hover:shadow-float"
    >
      <WhatsappIcon className="h-5 w-5 text-[#25D366]" />
      <span className="text-xs font-semibold text-ink transition-colors group-hover:text-primary">
        Chat
      </span>
    </a>
  );
}
