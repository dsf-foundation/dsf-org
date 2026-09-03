import type { Metadata } from "next";
import { DM_Sans, Sora, Geist } from "next/font/google";
import "@/app/globals.css";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Do Something Foundation | Humanitarian action for a better life",
    template: "%s | Do Something Foundation",
  },
  description:
    "Do Something Foundation is an international, non-religious, government-registered nonprofit working for education, food, shelter, healthcare and livelihoods — helping vulnerable families build a more hopeful life. Registration Number: NGO Affairs Bureau-3583.",
  keywords: [
    "Do Something Foundation",
    "humanitarian organization",
    "nonprofit",
    "donation",
    "disaster relief",
    "education",
    "clean water",
    "livelihoods",
    "international charity",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Do Something Foundation",
    title: "Do Something Foundation | Humanitarian action for a better life",
    description:
      "Education, food, shelter, healthcare and livelihoods for vulnerable families. Every donation used transparently.",
    url: site.url,
    images: [
      {
        url: "/images/programs/community/img-01.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Do Something Foundation",
    description:
      "Education, food, shelter, healthcare and livelihoods for vulnerable families.",
    images: ["/images/programs/community/img-01.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", dmsans.variable, sora.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
