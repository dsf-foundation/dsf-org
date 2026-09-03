import {
  getHeroes,
  getBlogs,
  getBlog,
  getHomeSlides,
  getHomeGallery,
  getCertificates,
  getPartners,
} from "./firestore-helpers";
import type {
  BlogPost,
  PageHero,
  DbBlogPost,
  HomeSlide,
  HomeGalleryPhoto,
  MarqueeItem,
} from "./firestore";

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getSiteHeroes(): Promise<Record<string, PageHero>> {
  return withFallback(getHeroes, {} as Record<string, PageHero>);
}

export async function getHeroForPage(page: string): Promise<PageHero> {
  const heroes = await getSiteHeroes();
  return heroes[page] ?? {
    kicker: "",
    title: "",
    subtitle: "",
    image: "",
  };
}

// --- Home Hero Slides ---

export async function getSiteHomeSlides(): Promise<HomeSlide[]> {
  return withFallback(getHomeSlides, [] as HomeSlide[]);
}

// --- Home Gallery ---

export async function getSiteHomeGallery(): Promise<HomeGalleryPhoto[]> {
  const gallery = await withFallback(getHomeGallery, null);
  return gallery?.photos ?? [];
}

// --- Certificates marquee ---

export async function getSiteCertificates(): Promise<MarqueeItem[]> {
  const list = await withFallback(getCertificates, null);
  return list?.items ?? [];
}

// --- Partners marquee ---

export async function getSitePartners(): Promise<MarqueeItem[]> {
  const list = await withFallback(getPartners, null);
  return list?.items ?? [];
}

// --- Blogs ---

function blogPostToSitePost(blog: DbBlogPost): BlogPost {
  const { createdAt, updatedAt, ...rest } = blog;
  return rest as BlogPost;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogs = await withFallback(getBlogs, [] as DbBlogPost[]);
  return blogs.map(blogPostToSitePost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blog = await withFallback(async () => getBlog(slug), null);
  if (blog) return blogPostToSitePost(blog);
  return null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map((p) => p.slug);
}
