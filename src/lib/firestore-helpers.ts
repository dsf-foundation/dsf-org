import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import type {
  DbBlogPost,
  DbPageHero,
  GalleryBatch,
  RichBlock,
  HomeSlide,
  HomeGallery,
  MarqueeList,
} from "./firestore";

const HEROES_COL = "heroes";
const BLOGS_COL = "blogs";
const HOME_SLIDES_COL = "homeSlides";
const HOME_SLIDES_DOC = "main";
const HOME_GALLERY_COL = "homeGallery";
const HOME_GALLERY_DOC = "main";
const CERTIFICATES_COL = "certificates";
const CERTIFICATES_DOC = "main";
const PARTNERS_COL = "partners";
const PARTNERS_DOC = "main";

// --- Heroes / Page Banners ---

export async function getHeroes(): Promise<Record<string, DbPageHero>> {
  const snap = await getDocs(collection(db, HEROES_COL));
  const result: Record<string, DbPageHero> = {};
  snap.forEach((d) => {
    result[d.id] = d.data() as DbPageHero;
  });
  return result;
}

export async function getHero(slug: string): Promise<DbPageHero | null> {
  const snap = await getDoc(doc(db, HEROES_COL, slug));
  return snap.exists() ? (snap.data() as DbPageHero) : null;
}

export async function setHero(
  slug: string,
  data: DbPageHero
): Promise<void> {
  await setDoc(doc(db, HEROES_COL, slug), data);
}

export async function deleteHero(slug: string): Promise<void> {
  await deleteDoc(doc(db, HEROES_COL, slug));
}

// --- Blogs ---

export async function getBlogs(): Promise<DbBlogPost[]> {
  const snap = await getDocs(query(collection(db, BLOGS_COL), orderBy("updatedAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as DbBlogPost);
}

export async function getBlog(slug: string): Promise<DbBlogPost | null> {
  const snap = await getDoc(doc(db, BLOGS_COL, slug));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as unknown as DbBlogPost) : null;
}

export async function setBlog(blog: DbBlogPost): Promise<void> {
  await setDoc(doc(db, BLOGS_COL, blog.slug), {
    ...blog,
    createdAt: blog.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteBlog(slug: string): Promise<void> {
  await deleteDoc(doc(db, BLOGS_COL, slug));
}

// --- Gallery Batches ---

const BATCHES_COL = "galleryBatches";

export async function getGalleryBatches(): Promise<GalleryBatch[]> {
  const snap = await getDocs(
    query(collection(db, BATCHES_COL), orderBy("createdAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryBatch));
}

export async function getGalleryBatch(id: string): Promise<GalleryBatch | null> {
  const snap = await getDoc(doc(db, BATCHES_COL, id));
  return snap.exists()
    ? ({ id: snap.id, ...snap.data() } as GalleryBatch)
    : null;
}

export async function getGalleryBatchesByActivity(
  activitySlug: string
): Promise<GalleryBatch[]> {
  const snap = await getDocs(
    query(
      collection(db, BATCHES_COL),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as GalleryBatch))
    .filter((b) => b.activitySlug === activitySlug);
}

export async function setGalleryBatch(batch: GalleryBatch): Promise<void> {
  await setDoc(doc(db, BATCHES_COL, batch.id), {
    ...batch,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteGalleryBatch(id: string): Promise<void> {
  await deleteDoc(doc(db, BATCHES_COL, id));
}

// --- Home Hero Slides ---

export async function getHomeSlides(): Promise<HomeSlide[]> {
  const snap = await getDoc(doc(db, HOME_SLIDES_COL, HOME_SLIDES_DOC));
  if (!snap.exists()) return [];
  const data = snap.data() as { slides?: HomeSlide[] };
  return data.slides ?? [];
}

export async function setHomeSlides(slides: HomeSlide[]): Promise<void> {
  await setDoc(doc(db, HOME_SLIDES_COL, HOME_SLIDES_DOC), {
    slides,
    updatedAt: new Date().toISOString(),
  });
}

// --- Home Gallery ---

export async function getHomeGallery(): Promise<HomeGallery | null> {
  const snap = await getDoc(doc(db, HOME_GALLERY_COL, HOME_GALLERY_DOC));
  return snap.exists() ? (snap.data() as HomeGallery) : null;
}

export async function setHomeGallery(gallery: HomeGallery): Promise<void> {
  await setDoc(doc(db, HOME_GALLERY_COL, HOME_GALLERY_DOC), {
    ...gallery,
    updatedAt: new Date().toISOString(),
  });
}

// --- Certificates marquee ---

export async function getCertificates(): Promise<MarqueeList | null> {
  const snap = await getDoc(doc(db, CERTIFICATES_COL, CERTIFICATES_DOC));
  return snap.exists() ? (snap.data() as MarqueeList) : null;
}

export async function setCertificates(list: MarqueeList): Promise<void> {
  await setDoc(doc(db, CERTIFICATES_COL, CERTIFICATES_DOC), {
    items: list.items,
    updatedAt: new Date().toISOString(),
  });
}

// --- Partners marquee ---

export async function getPartners(): Promise<MarqueeList | null> {
  const snap = await getDoc(doc(db, PARTNERS_COL, PARTNERS_DOC));
  return snap.exists() ? (snap.data() as MarqueeList) : null;
}

export async function setPartners(list: MarqueeList): Promise<void> {
  await setDoc(doc(db, PARTNERS_COL, PARTNERS_DOC), {
    items: list.items,
    updatedAt: new Date().toISOString(),
  });
}