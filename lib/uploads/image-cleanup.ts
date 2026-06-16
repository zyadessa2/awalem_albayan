import Book from "@/models/Book";
import BookSeries from "@/models/BookSeries";
import Course from "@/models/Course";
import { deleteS3UploadsByUrls, getS3UploadKeyFromUrl } from "@/lib/uploads/s3";

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
  const s3Urls = uniqueUrls(urls).filter((url) => Boolean(getS3UploadKeyFromUrl(url)));

  if (s3Urls.length === 0) {
    return { deleted: 0 };
  }

  const referencedUrls = await getReferencedImageUrls(s3Urls);
  const unusedUrls = s3Urls.filter((url) => !referencedUrls.has(url));

  return deleteS3UploadsByUrls(unusedUrls);
}
