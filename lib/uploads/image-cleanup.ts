import Book from "@/models/Book";
import BookSeries from "@/models/BookSeries";
import Course from "@/models/Course";
import {
  deleteHostingerUploadsByUrls,
  getHostingerUploadKeyFromUrl,
} from "@/lib/uploads/hostinger";

function uniqueUrls(urls: Array<string | null | undefined>) {
  return Array.from(new Set(urls.filter((url): url is string => Boolean(url?.trim()))));
}

export function getRemovedImageUrls(previous: string[], next: string[]) {
  const nextUrls = new Set(uniqueUrls(next));
  return uniqueUrls(previous).filter((url) => !nextUrls.has(url));
}

async function getReferencedImageUrls(urls: string[]) {
  if (urls.length === 0) {
    return new Set<string>();
  }

  const [courses, bookSeries, books] = await Promise.all([
    Course.find({ image: { $in: urls } }).select("image").lean(),
    BookSeries.find({ image: { $in: urls } }).select("image").lean(),
    Book.find({
      $or: [{ coverImage: { $in: urls } }, { previewImages: { $in: urls } }],
    })
      .select("coverImage previewImages")
      .lean(),
  ]);

  return new Set(
    uniqueUrls([
      ...courses.map((course) => course.image),
      ...bookSeries.map((series) => series.image),
      ...books.flatMap((book) => [book.coverImage, ...(book.previewImages ?? [])]),
    ])
  );
}

export async function deleteUnusedUploadedImages(urls: string[]) {
  const hostingerUrls = uniqueUrls(urls).filter((url) => Boolean(getHostingerUploadKeyFromUrl(url)));

  if (hostingerUrls.length === 0) {
    return { deleted: 0 };
  }

  const referencedUrls = await getReferencedImageUrls(hostingerUrls);
  const unusedUrls = hostingerUrls.filter((url) => !referencedUrls.has(url));

  return deleteHostingerUploadsByUrls(unusedUrls);
}
