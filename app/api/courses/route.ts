import { type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongoose";
import { created, fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { createSlug } from "@/lib/utils/slug";
import { createCourseSchema } from "@/lib/validators/course.validator";
import { requireAdminSession } from "@/lib/auth/session";
import Course from "@/models/Course";
import "@/models/Book";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const searchParams = request.nextUrl.searchParams;
    const filter: Record<string, unknown> = {};
    const query = searchParams.get("q");
    const isPublished = searchParams.get("isPublished");

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (isPublished !== null) {
      filter.isPublished = isPublished === "true";
    }

    const courses = await Course.find(filter)
      .populate("suggestedBooks")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return ok(courses);
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

    const payload = createCourseSchema.parse(body);
    const course = await Course.create({
      ...payload,
      slug: payload.slug || createSlug(payload.title),
    });

    return created(course);
  } catch (error) {
    return handleRouteError(error);
  }
}
