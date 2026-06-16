import { connectMongoDB } from "@/lib/mongoose";
import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { isValidObjectId } from "@/lib/utils/mongo";
import { getYouTubeVideoId } from "@/lib/utils/youtube";
import { updateLessonSchema } from "@/lib/validators/lesson.validator";
import { requireAdminSession } from "@/lib/auth/session";
import Lesson from "@/models/Lesson";
import "@/models/Course";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return fail("Invalid lesson id.", 400);
    }

    const lesson = await Lesson.findById(id).populate("courseId").lean();
    if (!lesson) {
      return fail("Lesson not found.", 404);
    }

    return ok(lesson);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return fail("Invalid lesson id.", 400);
    }

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = updateLessonSchema.parse(body);
    const youtubeVideoId = payload.youtubeUrl
      ? getYouTubeVideoId(payload.youtubeUrl)
      : undefined;

    if (payload.youtubeUrl && !youtubeVideoId) {
      return fail("Invalid YouTube URL.", 422);
    }

    const lesson = await Lesson.findByIdAndUpdate(
      id,
      {
        ...payload,
        ...(youtubeVideoId ? { youtubeVideoId } : {}),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lesson) {
      return fail("Lesson not found.", 404);
    }

    return ok(lesson);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectMongoDB();
    await requireAdminSession();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return fail("Invalid lesson id.", 400);
    }

    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) {
      return fail("Lesson not found.", 404);
    }

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
