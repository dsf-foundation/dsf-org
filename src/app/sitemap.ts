import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { activities, schoolBranches } from "@/data/activities";
import { getAllBlogSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths =
    ["", "/about", "/activities", "/blog", "/gallery", "/get-involved", "/contact", "/donate"] as const;
  const activityPaths = activities.map((a) => `/activities/${a.slug}`);
  const schoolBranchPaths = schoolBranches.map(
    (b) => `/activities/schools/${b.slug}`
  );
  const blogPaths = (await getAllBlogSlugs()).map((slug) => `/blog/${slug}`);
  const paths = [
    ...staticPaths,
    ...activityPaths,
    ...schoolBranchPaths,
    ...blogPaths,
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : /\/blog\//.test(path) ? 0.5 : 0.7,
  }));
}
