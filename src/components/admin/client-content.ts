"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { BlogPost, DbBlogPost, GalleryBatch } from "@/lib/firestore";

function blogPostToSitePost(blog: DbBlogPost): BlogPost {
  const { createdAt, updatedAt, ...rest } = blog;
  return rest as BlogPost;
}

export function useClientBlogs(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    getDocs(collection(db, "blogs"))
      .then((snap) => {
        if (!active) return;
        const docs = snap.docs.map((d) => d.data() as DbBlogPost);
        setPosts(docs.map(blogPostToSitePost));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return posts;
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
