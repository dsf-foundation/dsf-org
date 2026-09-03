"use client";

import Link from "next/link";
import {
  IoImageOutline,
  IoDocumentTextOutline,
  IoNewspaperOutline,
  IoHomeOutline,
  IoRibbonOutline,
  IoPeopleOutline,
  IoArrowForward,
} from "react-icons/io5";

const sections = [
  {
    label: "Page Banners",
    description: "Edit hero sections for every page — kicker, title, subtitle and background image.",
    href: "/admin/content-manager/banners",
    icon: IoImageOutline,
  },
  {
    label: "Blog Posts",
    description: "Create, edit and publish news stories with a rich text editor and image uploads.",
    href: "/admin/content-manager/blogs",
    icon: IoDocumentTextOutline,
  },
  {
    label: "Gallery",
    description: "Create donation batches — groups of photos tied to a program. Images are stored on Cloudinary.",
    href: "/admin/content-manager/gallery",
    icon: IoNewspaperOutline,
  },
  {
    label: "Home Gallery",
    description: "Curate the photo grid shown in the 'Moments that matter' section on the home page.",
    href: "/admin/content-manager/home-gallery",
    icon: IoHomeOutline,
  },
  {
    label: "Certificates",
    description: "Curate the 'Certificates & registration' marquee on the About page.",
    href: "/admin/content-manager/certificates",
    icon: IoRibbonOutline,
  },
  {
    label: "Partners",
    description: "Curate the 'Those who work for good will' partner marquee on the home page.",
    href: "/admin/content-manager/partners",
    icon: IoPeopleOutline,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Content Manager</h1>
        <p className="mt-2 max-w-lg text-sm text-gray-500">
          Manage your website content from here. Changes are saved to the database and appear on the live site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col justify-between border border-gray-200 bg-white p-6 transition hover:border-primary/40 hover:bg-gray-100"
          >
            <div>
              <span className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
                <section.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-gray-900">
                {section.label}
              </h2>
              <p className="mt-1.5 text-sm text-gray-500 leading-6">
                {section.description}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition group-hover:gap-2.5">
              Open
              <IoArrowForward className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
