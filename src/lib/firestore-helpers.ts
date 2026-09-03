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
  GalleryAlbum,
  GalleryBatch,
  RichBlock,
} from "./firestore";

const HEROES_COL = "heroes";
const BLOGS_COL = "blogs";
const GALLERY_COL = "galleryAlbums";

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
  const snap = await getDocs(query(collection(db, BLOGS_COL), orderBy("dateISO", "desc")));
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

// --- Gallery ---

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const snap = await getDocs(query(collection(db, GALLERY_COL), orderBy("label")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryAlbum));
}

export async function getGalleryAlbum(
  id: string
): Promise<GalleryAlbum | null> {
  const snap = await getDoc(doc(db, GALLERY_COL, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as GalleryAlbum) : null;
}

export async function setGalleryAlbum(album: GalleryAlbum): Promise<void> {
  await setDoc(doc(db, GALLERY_COL, album.id), album);
}

export async function deleteGalleryAlbum(id: string): Promise<void> {
  await deleteDoc(doc(db, GALLERY_COL, id));
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