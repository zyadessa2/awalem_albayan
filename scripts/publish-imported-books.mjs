import nextEnv from "@next/env";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.resolve(projectRoot, "..", "موك اب الكتب-webp", "import-report.json");
const { loadEnvConfig } = nextEnv;

loadEnvConfig(projectRoot);

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing.");
  }

  const report = JSON.parse(await readFile(reportPath, "utf8"));
  const slugs = report.results.map((book) => book.slug);

  await mongoose.connect(process.env.MONGODB_URI);

  const books = mongoose.connection.db.collection("books");
  const series = mongoose.connection.db.collection("bookseries");
  const importedFilter = { slug: { $in: slugs } };
  const publishedBefore = await books.countDocuments({ ...importedFilter, isPublished: true });

  const booksResult = await books.updateMany(importedFilter, {
    $set: { isPublished: true },
  });

  const importedBooks = await books.find(importedFilter).toArray();
  const seriesIds = [
    ...new Set(importedBooks.map((book) => book.seriesId).filter(Boolean).map(String)),
  ];

  let seriesModified = 0;
  for (const seriesId of seriesIds) {
    const firstBook = importedBooks.find(
      (book) => String(book.seriesId) === seriesId && book.coverImage,
    );
    const update = { isPublished: true };

    // Use a real cover in the public series card when the imported series has no image yet.
    if (firstBook?.coverImage) {
      update.image = firstBook.coverImage;
    }

    const result = await series.updateOne(
      { _id: new mongoose.Types.ObjectId(seriesId) },
      { $set: update },
    );
    seriesModified += result.modifiedCount;
  }

  const publishedAfter = await books.countDocuments({ ...importedFilter, isPublished: true });
  console.log(
    JSON.stringify({
      reportBooks: slugs.length,
      publishedBefore,
      publishedAfter,
      booksModified: booksResult.modifiedCount,
      seriesFound: seriesIds.length,
      seriesModified,
    }),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
