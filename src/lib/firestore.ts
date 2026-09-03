export type RichBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      credit?: string;
    }
  | { type: "callout"; title?: string; text: string };

export type BlogPost = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  author: string;
  readTime: string;
  intro: string;
  blocks: RichBlock[];
};

export type PageHero = {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
};

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export type GalleryAlbum = {
  id: string;
  label: string;
  photos: GalleryPhoto[];
};

export type DbBlogPost = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  author: string;
  readTime: string;
  intro: string;
  blocks: RichBlock[];
  createdAt: string;
  updatedAt: string;
};

export type DbPageHero = {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
};

export type GalleryBatch = {
  id: string;
  title: string;
  activitySlug: string;
  description?: string;
  date?: string;
  photos: { src: string; caption: string }[];
  createdAt: string;
  updatedAt: string;
};