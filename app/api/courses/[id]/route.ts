import { connectMongoDB } from "@/lib/mongoose";
import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { isValidObjectId } from "@/lib/utils/mongo";
import { createSlug } from "@/lib/utils/slug";
import { updateCourseSchema } from "@/lib/validators/course.validator";
import { requireAdminSession } from "@/lib/auth/session";
import { deleteUnusedUploadedImages, getRemovedImageUrls } from "@/lib/uploads/image-cleanup";
import Course from "@/models/Course";
import "@/models/Book";

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
      return fail("Invalid course id.", 400);
    }

    const course = await Course.findById(id).populate("suggestedBooks").lean();
    if (!course) {
      return fail("Course not found.", 404);
    }

    return ok(course);
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
      return fail("Invalid course id.", 400);
    }

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = updateCourseSchema.parse(body);
    const update: Record<string, unknown> = { ...payload };

    if (!payload.slug && payload.title) {
      update.slug = createSlug(payload.title);
    } else if (payload.slug === "") {
      delete update.slug;
    }

    const previousCourse = await Course.findById(id);
    if (!previousCourse) {
      return fail("Course not found.", 404);
    }

    const course = await Course.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if ("image" in payload) {
      const removedImages = getRemovedImageUrls(
        [previousCourse.image],
        [course?.image ?? ""]
      );
      await deleteUnusedUploadedImages(removedImages);
    }

    return ok(course);
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
      return fail("Invalid course id.", 400);
    }

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return fail("Course not found.", 404);
    }

    await deleteUnusedUploadedImages([course.image]);

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
