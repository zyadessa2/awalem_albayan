import type { MetadataRoute } from "next";
import {
  getPublishedBookSeries,
  getPublishedBooks,
  getPublishedCourses,
} from "@/lib/data/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [courses, series, books] = await Promise.all([
    getPublishedCourses(),
    getPublishedBookSeries(),
    getPublishedBooks(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/courses"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/books"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.slug || course._id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const seriesRoutes: MetadataRoute.Sitemap = series.map((item) => ({
    url: absoluteUrl(`/books/${item.slug || item._id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => {
    const seriesId =
      book.seriesId && typeof book.seriesId === "object"
        ? book.seriesId.slug || book.seriesId._id
        : book.seriesId || "standalone";

    return {
      url: absoluteUrl(`/books/${seriesId}/${book.slug || book._id}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    };
  });

  return [...staticRoutes, ...courseRoutes, ...seriesRoutes, ...bookRoutes];
}
