import nextEnv from "@next/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import sharp from "sharp";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { loadEnvConfig } = nextEnv;
loadEnvConfig(projectRoot);

const DEFAULT_SOURCE = "C:\\D folder\\code\\projects\\Noor Elbayan\\awalim albayan\\frontend\\موك اب الكتب";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"]);
const MAX_IMAGE_WIDTH = 1800;
const WEBP_QUALITY = 78;

function parseArguments(argv) {
  const options = {
    source: DEFAULT_SOURCE,
    output: "",
    commit: false,
    bookFilter: "",
    quality: WEBP_QUALITY,
    maxWidth: MAX_IMAGE_WIDTH,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--commit") options.commit = true;
    else if (argument === "--source") options.source = argv[++index];
    else if (argument === "--output") options.output = argv[++index];
    else if (argument === "--book") options.bookFilter = argv[++index];
    else if (argument === "--quality") options.quality = Number(argv[++index]);
    else if (argument === "--max-width") options.maxWidth = Number(argv[++index]);
    else if (argument === "--help") {
      console.log(`
Book image importer

  npm run import:book-images
  npm run import:book-images -- --book "اسم الكتاب"
  npm run import:book-images -- --book "اسم الكتاب" --commit
  npm run import:book-images -- --commit

Options:
  --source <path>      Source books directory
  --output <path>      WebP output directory (default: <source>-webp)
  --book <text>        Import one matching book/path only
  --quality <1-100>    WebP quality (default: ${WEBP_QUALITY})
  --max-width <px>     Maximum image width (default: ${MAX_IMAGE_WIDTH})
  --commit             Convert, upload, and update MongoDB
`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  options.output ||= `${options.source}-webp`;

  if (!Number.isFinite(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error("--quality must be between 1 and 100.");
  }
  if (!Number.isFinite(options.maxWidth) || options.maxWidth < 320) {
    throw new Error("--max-width must be at least 320.");
  }

  return options;
}

function createSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeName(value) {
  return path
    .parse(value)
    .name
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function isNumberedPreview(fileName) {
  return /^\d+$/.test(path.parse(fileName).name.trim());
}

function sortNumberedPreviews(files) {
  return [...files].sort((left, right) => Number(path.parse(left).name) - Number(path.parse(right).name));
}

async function getDirectoryEntries(directory) {
  return readdir(directory, { withFileTypes: true });
}

async function getDirectImages(directory) {
  const entries = await getDirectoryEntries(directory);
  return entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
}

async function findImageDirectories(directory) {
  const result = [];

  async function walk(currentDirectory) {
    const entries = await getDirectoryEntries(currentDirectory);
    const images = entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name);

    if (images.length > 0) result.push({ directory: currentDirectory, images });

    for (const entry of entries) {
      if (entry.isDirectory()) await walk(path.join(currentDirectory, entry.name));
    }
  }

  await walk(directory);
  return result;
}

function chooseCover(directoryName, images) {
  const previewFiles = sortNumberedPreviews(images.filter(isNumberedPreview));
  const coverCandidates = images.filter((fileName) => !isNumberedPreview(fileName));

  if (coverCandidates.length === 0) {
    return { error: "لا توجد صورة غلاف باسم الكتاب.", previewFiles };
  }

  if (coverCandidates.length === 1) {
    return { coverFile: coverCandidates[0], previewFiles, ignoredFiles: [] };
  }

  const normalizedDirectory = normalizeName(directoryName);
  const matchingCandidates = coverCandidates.filter((fileName) => {
    const normalizedFile = normalizeName(fileName);
    return normalizedFile === normalizedDirectory || normalizedFile.includes(normalizedDirectory) || normalizedDirectory.includes(normalizedFile);
  });

  const allCandidatesShareName = new Set(coverCandidates.map(normalizeName)).size === 1;
  const usableCandidates = matchingCandidates.length > 0 ? matchingCandidates : allCandidatesShareName ? coverCandidates : [];
  const uniqueNames = new Set(usableCandidates.map(normalizeName));

  if (usableCandidates.length > 0 && uniqueNames.size === 1) {
    const coverFile = [...usableCandidates].sort((left, right) => {
      const leftPng = path.extname(left).toLowerCase() === ".png" ? 1 : 0;
      const rightPng = path.extname(right).toLowerCase() === ".png" ? 1 : 0;
      return rightPng - leftPng;
    })[0];
    return {
      coverFile,
      previewFiles,
      ignoredFiles: coverCandidates.filter((fileName) => fileName !== coverFile),
    };
  }

  return {
    error: `صور غلاف متعددة غير واضحة: ${coverCandidates.join(", ")}`,
    previewFiles,
  };
}

async function discoverBooks(sourceRoot) {
  const topLevelEntries = (await getDirectoryEntries(sourceRoot)).filter((entry) => entry.isDirectory());
  const books = [];

  for (const topLevelEntry of topLevelEntries) {
    const topLevelPath = path.join(sourceRoot, topLevelEntry.name);
    const childDirectories = (await getDirectoryEntries(topLevelPath)).filter((entry) => entry.isDirectory());
    const isSeries = childDirectories.length > 0;

    if (!isSeries) {
      const images = await getDirectImages(topLevelPath);
      if (images.length > 0) {
        books.push({
          sourceDirectory: topLevelPath,
          relativeDirectory: topLevelEntry.name,
          title: topLevelEntry.name,
          seriesTitle: null,
          images,
        });
      }
      continue;
    }

    const imageDirectories = await findImageDirectories(topLevelPath);
    for (const imageDirectory of imageDirectories) {
      const relativeInsideSeries = path.relative(topLevelPath, imageDirectory.directory);
      const titleParts = relativeInsideSeries.split(path.sep).filter(Boolean);
      books.push({
        sourceDirectory: imageDirectory.directory,
        relativeDirectory: path.join(topLevelEntry.name, relativeInsideSeries),
        title: titleParts.join(" - "),
        seriesTitle: topLevelEntry.name,
        images: imageDirectory.images,
      });
    }
  }

  return books.map((book) => ({ ...book, classification: chooseCover(path.basename(book.sourceDirectory), book.images) }));
}

async function convertToWebP(sourcePath, destinationPath, options) {
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await sharp(sourcePath)
    .rotate()
    .resize({ width: options.maxWidth, withoutEnlargement: true })
    .webp({ quality: options.quality, effort: 5, smartSubsample: true })
    .toFile(destinationPath);
}

function getS3Config() {
  const region = process.env.AWS_REGION?.trim();
  const bucket = process.env.AWS_S3_BUCKET_NAME?.trim();
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();

  if (!region || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error("AWS S3 configuration is incomplete.");
  }

  return { region, bucket, credentials: { accessKeyId, secretAccessKey } };
}

function createS3Url(config, key) {
  return `https://${config.bucket}.s3.${config.region}.amazonaws.com/${key}`;
}

async function uploadWebP(client, config, filePath, key) {
  const file = await readFile(filePath);
  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: file,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  return createS3Url(config, key);
}

async function ensureSeries(collection, title) {
  const slug = createSlug(title);
  const existing = await collection.findOne({ slug });
  if (existing) return existing._id;

  const now = new Date();
  const result = await collection.insertOne({
    title,
    slug,
    description: "",
    image: "",
    isPublished: false,
    order: 0,
    createdAt: now,
    updatedAt: now,
  });
  return result.insertedId;
}

async function upsertBook(collection, book, urls, seriesId, order) {
  const slugSource = book.seriesTitle ? `${book.seriesTitle}-${book.title}` : book.title;
  const slug = createSlug(slugSource);
  const now = new Date();

  await collection.updateOne(
    { slug },
    {
      $set: {
        coverImage: urls.coverImage,
        previewImages: urls.previewImages,
        seriesId: seriesId ?? null,
        updatedAt: now,
      },
      $setOnInsert: {
        title: book.title,
        slug,
        description: "",
        buyUrl: "",
        whatsappUrl: "",
        suggestedForCourses: [],
        isPublished: false,
        order,
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return slug;
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  const sourceStats = await stat(options.source).catch(() => null);
  if (!sourceStats?.isDirectory()) throw new Error(`Source directory not found: ${options.source}`);

  let books = await discoverBooks(options.source);
  if (options.bookFilter) {
    const filter = normalizeName(options.bookFilter);
    books = books.filter((book) => normalizeName(`${book.relativeDirectory} ${book.title}`).includes(filter));
  }

  const ready = books.filter((book) => !book.classification.error);
  const review = books.filter((book) => book.classification.error);

  console.log(`\nMode: ${options.commit ? "COMMIT" : "DRY RUN"}`);
  console.log(`Source: ${options.source}`);
  console.log(`Output: ${options.output}`);
  console.log(`Books discovered: ${books.length}`);
  console.log(`Ready: ${ready.length}`);
  console.log(`Needs review: ${review.length}\n`);

  for (const book of ready) {
    console.log(`READY | ${book.seriesTitle ? `[${book.seriesTitle}] ` : ""}${book.title} | cover=${book.classification.coverFile} | previews=${book.classification.previewFiles.length}`);
  }
  for (const book of review) {
    console.log(`REVIEW | ${book.relativeDirectory} | ${book.classification.error}`);
  }

  if (!options.commit) {
    console.log("\nDry run only. Add --commit to convert, upload, and update MongoDB.");
    return;
  }

  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri) throw new Error("MONGODB_URI is missing.");

  const s3Config = getS3Config();
  const s3Client = new S3Client({ region: s3Config.region, credentials: s3Config.credentials });
  await mongoose.connect(mongoUri);

  const booksCollection = mongoose.connection.collection("books");
  const seriesCollection = mongoose.connection.collection("bookseries");
  const seriesIds = new Map();
  const results = [];

  try {
    for (let index = 0; index < ready.length; index += 1) {
      const book = ready[index];
      const safeSlug = createSlug(book.seriesTitle ? `${book.seriesTitle}-${book.title}` : book.title);
      const destinationDirectory = path.join(options.output, book.relativeDirectory);
      const coverOutput = path.join(destinationDirectory, "cover.webp");
      const previewOutputs = book.classification.previewFiles.map((_, previewIndex) => path.join(destinationDirectory, `preview-${String(previewIndex + 1).padStart(3, "0")}.webp`));

      try {
        await convertToWebP(path.join(book.sourceDirectory, book.classification.coverFile), coverOutput, options);
        for (let previewIndex = 0; previewIndex < book.classification.previewFiles.length; previewIndex += 1) {
          await convertToWebP(
            path.join(book.sourceDirectory, book.classification.previewFiles[previewIndex]),
            previewOutputs[previewIndex],
            options,
          );
        }

        const keyPrefix = `uploads/books/${safeSlug}`;
        const coverImage = await uploadWebP(s3Client, s3Config, coverOutput, `${keyPrefix}/cover.webp`);
        const previewImages = [];
        for (let previewIndex = 0; previewIndex < previewOutputs.length; previewIndex += 1) {
          previewImages.push(
            await uploadWebP(
              s3Client,
              s3Config,
              previewOutputs[previewIndex],
              `${keyPrefix}/preview-${String(previewIndex + 1).padStart(3, "0")}.webp`,
            ),
          );
        }

        let seriesId = null;
        if (book.seriesTitle) {
          if (!seriesIds.has(book.seriesTitle)) {
            seriesIds.set(book.seriesTitle, await ensureSeries(seriesCollection, book.seriesTitle));
          }
          seriesId = seriesIds.get(book.seriesTitle);
        }

        const slug = await upsertBook(booksCollection, book, { coverImage, previewImages }, seriesId, index);
        const originalBytes = await Promise.all(
          [book.classification.coverFile, ...book.classification.previewFiles].map((fileName) => stat(path.join(book.sourceDirectory, fileName)).then((fileStats) => fileStats.size)),
        );
        const webpBytes = await Promise.all([coverOutput, ...previewOutputs].map((filePath) => stat(filePath).then((fileStats) => fileStats.size)));
        const originalTotal = originalBytes.reduce((sum, value) => sum + value, 0);
        const webpTotal = webpBytes.reduce((sum, value) => sum + value, 0);

        results.push({
          status: "success",
          title: book.title,
          seriesTitle: book.seriesTitle,
          slug,
          coverImage,
          previewImages,
          originalBytes: originalTotal,
          webpBytes: webpTotal,
          savedPercent: originalTotal > 0 ? Math.round((1 - webpTotal / originalTotal) * 100) : 0,
        });
        console.log(`IMPORTED | ${book.title} | previews=${previewImages.length} | saved=${results.at(-1).savedPercent}%`);
      } catch (error) {
        results.push({ status: "failed", title: book.title, seriesTitle: book.seriesTitle, error: error instanceof Error ? error.message : String(error) });
        console.error(`FAILED | ${book.title} | ${error instanceof Error ? error.message : error}`);
      }
    }
  } finally {
    await mongoose.disconnect();
  }

  await mkdir(options.output, { recursive: true });
  const reportPath = path.join(options.output, "import-report.json");
  await writeFile(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: options.source,
        output: options.output,
        settings: { quality: options.quality, maxWidth: options.maxWidth },
        summary: {
          discovered: books.length,
          ready: ready.length,
          needsReview: review.length,
          imported: results.filter((result) => result.status === "success").length,
          failed: results.filter((result) => result.status === "failed").length,
        },
        review: review.map((book) => ({ path: book.relativeDirectory, reason: book.classification.error })),
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\nReport: ${reportPath}`);
}

run().catch((error) => {
  console.error(`\nImport failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
