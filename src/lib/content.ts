import {
  getHeroes,
  getBlogs,
  getBlog,
  getGalleryAlbums,
} from "./firestore-helpers";
import type {
  BlogPost,
  PageHero,
  GalleryAlbum,
  DbBlogPost,
} from "./firestore";
import { blogPosts, getPost } from "@/data/blogs";
import { galleryAlbums as staticAlbums, galleryPhotos as staticPhotos } from "@/data/gallery";
import { dict } from "@/data/dictionary";
import { img } from "@/data/images";

const STATIC_HEROES: Record<string, PageHero> = {
  home: {
    kicker: dict.hero.kicker,
    title: dict.hero.title,
    subtitle: dict.hero.subtitle,
    image: img.hero.community,
  },
  about: {
    kicker: "Who we are",
    title: "About our foundation",
    subtitle: "Do Something Foundation is a government-registered Bangladeshi nonprofit working for education, relief and practical support.",
    image: img.stories.river,
  },
  activities: {
    kicker: "What we do",
    title: "Our programs",
    subtitle: "From education to emergency relief, water, shelter, healthcare and livelihoods — explore the ongoing humanitarian work of Do Something Foundation.",
    image: img.programs.shelter,
  },
  blog: {
    kicker: "News & stories",
    title: "News",
    subtitle: "Field reports and updates from our education, relief and humanitarian work.",
    image: img.stories.field,
  },
  gallery: {
    kicker: "Moments that matter",
    title: "Gallery",
    subtitle: "Real moments from real programs — captured as it happens on the ground.",
    image: img.hero.community,
  },
  contact: {
    kicker: "Get in touch",
    title: "Contact us",
    subtitle: "Whether it's about donations, volunteering, a partnership or a press enquiry, we're glad to hear from you.",
    image: img.programs.skills,
  },
  donate: {
    kicker: "Support our mission",
    title: "Donate",
    subtitle: "Every contribution — however small — keeps education, relief and skill programs running.",
    image: img.programs.relief,
  },
  "get-involved": {
    kicker: "Partner with us",
    title: "Get involved",
    subtitle: "There are many genuine ways to be part of our work — by giving, volunteering, partnering, or spreading the word.",
    image: "/images/programs/community/img-07.jpg",
  },
};

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getSiteHeroes(): Promise<Record<string, PageHero>> {
  const heroes = await withFallback(getHeroes, {} as Record<string, PageHero>);
  return { ...STATIC_HEROES, ...heroes };
}

export async function getHeroForPage(page: string): Promise<PageHero> {
  const heroes = await getSiteHeroes();
  return heroes[page] ?? STATIC_HEROES[page] ?? {
    kicker: "", title: "", subtitle: "", image: img.hero.community,
  };
}

// --- Blogs ---

function blogPostToSitePost(blog: DbBlogPost): BlogPost {
  const { createdAt, updatedAt, ...rest } = blog;
  return rest as BlogPost;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogs = await withFallback(getBlogs, [] as DbBlogPost[]);
  if (blogs.length > 0) return blogs.map(blogPostToSitePost);
  return blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blog = await withFallback(async () => getBlog(slug), null);
  if (blog) return blogPostToSitePost(blog);
  const staticPost = getPost(slug);
  return staticPost ? (staticPost as BlogPost) : null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map((p) => p.slug);
}

// --- Gallery ---

export type SiteGalleryAlbum = { id: string; label: string };
export type SiteGalleryPhoto = { src: string; album: string; caption: string };

export async function getGalleryAlbumsData(): Promise<{
  albums: SiteGalleryAlbum[];
  photos: SiteGalleryPhoto[];
}> {
  const galleries = await withFallback(getGalleryAlbums, [] as GalleryAlbum[]);
  if (galleries.length > 0) {
    const albums = galleries.map((g) => ({ id: g.id, label: g.label }));
    const photos = galleries.flatMap((g) =>
      (g.photos || []).map((p) => ({ src: p.src, album: g.id, caption: p.caption }))
    );
    return { albums, photos };
  }
  return { albums: staticAlbums.map((a) => ({ id: a.id, label: a.label })), photos: staticPhotos };
}

// --- Helpers ---

export function statically(): { heroes: Record<string, PageHero>; blogPosts: BlogPost[]; dict: typeof dict } {
  return {
    heroes: STATIC_HEROES,
    blogPosts: blogPosts as BlogPost[],
    dict,
  };
}