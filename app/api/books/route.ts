import { type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongoose";
import { created, fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { createSlug } from "@/lib/utils/slug";
import { createBookSchema } from "@/lib/validators/book.validator";
import { requireAdminSession } from "@/lib/auth/session";
import Book from "@/models/Book";
import "@/models/BookSeries";
import "@/models/Course";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const searchParams = request.nextUrl.searchParams;
    const filter: Record<string, unknown> = {};
    const query = searchParams.get("q");
    const seriesId = searchParams.get("seriesId");
    const courseId = searchParams.get("courseId");
    const standalone = searchParams.get("standalone");
    const isPublished = searchParams.get("isPublished");

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (seriesId) {
      filter.seriesId = seriesId;
    }

    if (courseId) {
      filter.suggestedForCourses = courseId;
    }

    if (standalone === "true") {
      filter.$or = [{ seriesId: null }, { seriesId: { $exists: false } }];
    }

    if (isPublished !== null) {
      filter.isPublished = isPublished === "true";
    }

    const books = await Book.find(filter)
      .populate("seriesId")
      .populate("suggestedForCourses")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return ok(books);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = createBookSchema.parse(body);
    const book = await Book.create({
      ...payload,
      slug: payload.slug || createSlug(payload.title),
      seriesId: payload.seriesId || null,
    });

    return created(book);
  } catch (error) {
    return handleRouteError(error);
  }
}
