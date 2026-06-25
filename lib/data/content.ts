import { connectMongoDB } from "@/lib/mongoose";
import { isValidObjectId } from "@/lib/utils/mongo";
import Book from "@/models/Book";
import BookSeries from "@/models/BookSeries";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import "@/models/Book";
import "@/models/BookSeries";
import "@/models/Course";

export type PublicBook = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  previewImages: string[];
  buyUrl: string;
  whatsappUrl: string;
  seriesId: string | PublicBookSeries | null;
  suggestedForCourses: string[];
  isPublished: boolean;
  order: number;
};

export type PublicBookSeries = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isPublished: boolean;
  order: number;
  bookCount?: number;
};

export type PublicCourse = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  youtubePlaylistUrl: string;
  suggestedBooks: PublicBook[];
  lessonCount?: number;
  durationLabel?: string;
  isPublished: boolean;
  order: number;
};

export type PublicLesson = {
  _id: string;
  courseId: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  duration: string;
  isLocked: boolean;
  isPublished: boolean;
  order: number;
};

function serialize<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function withDatabase<T>(fallback: T, callback: () => Promise<T>) {
  try {
    await connectMongoDB();
    return await callback();
  } catch (error) {
    console.error("Public content database query failed:", error);
    return fallback;
  }
}

function identifierFilter(identifier: string) {
  let normalizedIdentifier = identifier;

  // Dynamic route params can contain URL-encoded Arabic slugs in Next.js 16.
  try {
    normalizedIdentifier = decodeURIComponent(identifier);
  } catch {
    // Keep the original value when a malformed escape sequence is received.
  }

  return isValidObjectId(normalizedIdentifier)
    ? { _id: normalizedIdentifier, isPublished: true }
    : { slug: normalizedIdentifier, isPublished: true };
}

function toEnglishDigits(value: string) {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return value.replace(/[٠-٩۰-۹]/g, (digit) => {
    const arabicIndex = arabicDigits.indexOf(digit);
    if (arabicIndex >= 0) return String(arabicIndex);
    return String(persianDigits.indexOf(digit));
  });
}

function parseDurationMinutes(duration: string) {
  const normalized = toEnglishDigits(duration.toLowerCase());
  const matches = [...normalized.matchAll(/(\d+(?:\.\d+)?)/g)];

  if (matches.length === 0) {
    return 0;
  }

  const value = Number(matches[0][1]);
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (normalized.includes("hour") || normalized.includes("hr") || normalized.includes("ساعة")) {
    return Math.round(value * 60);
  }

  return Math.round(value);
}

function formatDurationLabel(totalMinutes: number) {
  if (totalMinutes <= 0) {
    return "0 ساعة";
  }

  if (totalMinutes < 60) {
    return `${totalMinutes} دقيقة`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes > 0 ? `${hours} س ${minutes} د` : `${hours} ساعة`;
}

export async function getPublishedCourses(limit?: number) {
  return withDatabase<PublicCourse[]>([], async () => {
    const query = Course.find({ isPublished: true })
      .populate("suggestedBooks")
      .sort({ order: 1, createdAt: -1 });

    if (limit) {
      query.limit(limit);
    }

    const courses = serialize<PublicCourse[]>(await query.lean());
    const courseIds = courses.map((course) => course._id);
    const lessons = await Lesson.find({ courseId: { $in: courseIds }, isPublished: true })
      .select("courseId duration")
      .lean();

    const lessonStats = new Map<string, { count: number; minutes: number }>();

    lessons.forEach((lesson) => {
      const courseId = String(lesson.courseId);
      const current = lessonStats.get(courseId) ?? { count: 0, minutes: 0 };
      lessonStats.set(courseId, {
        count: current.count + 1,
        minutes: current.minutes + parseDurationMinutes(String(lesson.duration || "")),
      });
    });

    return courses.map((course) => {
      const stats = lessonStats.get(course._id) ?? { count: 0, minutes: 0 };

      return {
        ...course,
        lessonCount: stats.count,
        durationLabel: formatDurationLabel(stats.minutes),
      };
    });
  });
}

export async function getPublishedCourse(identifier: string) {
  return withDatabase<PublicCourse | null>(null, async () => {
    const course = await Course.findOne(identifierFilter(identifier))
      .populate("suggestedBooks")
      .lean();

    return serialize<PublicCourse | null>(course);
  });
}

export async function getPublishedLessonsByCourse(courseId: string) {
  return withDatabase<PublicLesson[]>([], async () => {
    const lessons = await Lesson.find({ courseId, isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return serialize<PublicLesson[]>(lessons);
  });
}

export async function getPublishedBookSeries(limit?: number) {
  return withDatabase<PublicBookSeries[]>([], async () => {
    const query = BookSeries.find({ isPublished: true }).sort({
      order: 1,
      createdAt: -1,
    });

    if (limit) {
      query.limit(limit);
    }

    const series = serialize<PublicBookSeries[]>(await query.lean());
    const counts = await Book.aggregate<{ _id: string; count: number }>([
      { $match: { isPublished: true, seriesId: { $ne: null } } },
      { $group: { _id: "$seriesId", count: { $sum: 1 } } },
    ]);

    const countMap = new Map(counts.map((item) => [String(item._id), item.count]));

    return series.map((item) => ({
      ...item,
      bookCount: countMap.get(item._id) ?? 0,
    }));
  });
}

export async function getPublishedBookSeriesByIdentifier(identifier: string) {
  return withDatabase<PublicBookSeries | null>(null, async () => {
    const series = await BookSeries.findOne(identifierFilter(identifier)).lean();
    return serialize<PublicBookSeries | null>(series);
  });
}

export async function getPublishedBooksBySeries(seriesId: string) {
  return withDatabase<PublicBook[]>([], async () => {
    const books = await Book.find({ seriesId, isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return serialize<PublicBook[]>(books);
  });
}

export async function getPublishedStandaloneBooks(limit?: number) {
  return withDatabase<PublicBook[]>([], async () => {
    const query = Book.find({
      isPublished: true,
      $or: [{ seriesId: null }, { seriesId: { $exists: false } }],
    }).sort({
      order: 1,
      createdAt: -1,
    });

    if (limit) {
      query.limit(limit);
    }

    return serialize<PublicBook[]>(await query.lean());
  });
}

export async function getPublishedBooks(limit?: number) {
  return withDatabase<PublicBook[]>([], async () => {
    const query = Book.find({ isPublished: true })
      .populate("seriesId")
      .sort({ order: 1, createdAt: -1 });

    if (limit) {
      query.limit(limit);
    }

    return serialize<PublicBook[]>(await query.lean());
  });
}

export async function getPublishedBook(identifier: string) {
  return withDatabase<PublicBook | null>(null, async () => {
    const book = await Book.findOne(identifierFilter(identifier))
      .populate("seriesId")
      .lean();

    return serialize<PublicBook | null>(book);
  });
}

export async function getAdminCourses() {
  return withDatabase<PublicCourse[]>([], async () => {
    const courses = await Course.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return serialize<PublicCourse[]>(courses);
  });
}

export async function getAdminBookSeries() {
  return withDatabase<PublicBookSeries[]>([], async () => {
    const series = await BookSeries.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return serialize<PublicBookSeries[]>(series);
  });
}

export async function getAdminBooks() {
  return withDatabase<PublicBook[]>([], async () => {
    const books = await Book.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return serialize<PublicBook[]>(books);
  });
}
