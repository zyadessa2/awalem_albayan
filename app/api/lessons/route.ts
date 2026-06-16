import { type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongoose";
import { created, fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { getYouTubeVideoId } from "@/lib/utils/youtube";
import { createLessonSchema } from "@/lib/validators/lesson.validator";
import { requireAdminSession } from "@/lib/auth/session";
import Lesson from "@/models/Lesson";
import "@/models/Course";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const searchParams = request.nextUrl.searchParams;
    const filter: Record<string, unknown> = {};
    const courseId = searchParams.get("courseId");
    const isPublished = searchParams.get("isPublished");

    if (courseId) {
      filter.courseId = courseId;
    }

    if (isPublished !== null) {
      filter.isPublished = isPublished === "true";
    }

    const lessons = await Lesson.find(filter)
      .populate("courseId")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return ok(lessons);
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

    const payload = createLessonSchema.parse(body);
    const youtubeVideoId = getYouTubeVideoId(payload.youtubeUrl);
    if (!youtubeVideoId) {
      return fail("Invalid YouTube URL.", 422);
    }

    const lesson = await Lesson.create({
      ...payload,
      youtubeVideoId,
    });

    return created(lesson);
  } catch (error) {
    return handleRouteError(error);
  }
}
