"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { BlogPost, DbBlogPost, GalleryBatch } from "@/lib/firestore";
import { blogPosts } from "@/data/blogs";
import { galleryAlbums as staticAlbums, galleryPhotos as staticPhotos } from "@/data/gallery";

const staticBlogs = blogPosts as BlogPost[];

function blogPostToSitePost(blog: DbBlogPost): BlogPost {
  const { createdAt, updatedAt, ...rest } = blog;
  return rest as BlogPost;
}

export function useClientBlogs(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>(staticBlogs);

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "blogs"))
      .then((snap) => {
        if (!active) return;
        const docs = snap.docs.map((d) => d.data() as DbBlogPost);
        if (docs.length > 0) setPosts(docs.map(blogPostToSitePost));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return posts;
}

export type SiteGalleryAlbum = { id: string; label: string };
export type SiteGalleryPhoto = { src: string; album: string; caption: string };

export function useClientGallery(): {
  albums: SiteGalleryAlbum[];
  photos: SiteGalleryPhoto[];
} {
  const [state, setState] = useState<{
    albums: SiteGalleryAlbum[];
    photos: SiteGalleryPhoto[];
  }>({
    albums: staticAlbums.map((a) => ({ id: a.id, label: a.label })),
    photos: staticPhotos,
  });

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "galleryAlbums"))
      .then((snap) => {
        if (!active) return;
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as { label: string; photos: { src: string; caption: string }[] }),
        }));
        if (docs.length > 0) {
          setState({
            albums: docs.map((g) => ({ id: g.id, label: g.label })),
            photos: docs.flatMap((g) =>
              (g.photos || []).map((p) => ({ src: p.src, album: g.id, caption: p.caption }))
            ),
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return state;
}

export function useClientBatches(): GalleryBatch[] {
  const [batches, setBatches] = useState<GalleryBatch[]>([]);

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "galleryBatches"))
      .then((snap) => {
        if (!active) return;
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as GalleryBatch[];
        setBatches(docs);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return batches;
}