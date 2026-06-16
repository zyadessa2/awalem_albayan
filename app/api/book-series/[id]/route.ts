import { connectMongoDB } from "@/lib/mongoose";
import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { isValidObjectId } from "@/lib/utils/mongo";
import { createSlug } from "@/lib/utils/slug";
import { updateBookSeriesSchema } from "@/lib/validators/book-series.validator";
import { requireAdminSession } from "@/lib/auth/session";
import { deleteUnusedUploadedImages, getRemovedImageUrls } from "@/lib/uploads/image-cleanup";
import BookSeries from "@/models/BookSeries";

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
      return fail("Invalid book series id.", 400);
    }

    const bookSeries = await BookSeries.findById(id).lean();
    if (!bookSeries) {
      return fail("Book series not found.", 404);
    }

    return ok(bookSeries);
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
      return fail("Invalid book series id.", 400);
    }

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = updateBookSeriesSchema.parse(body);
    const update: Record<string, unknown> = { ...payload };

    if (!payload.slug && payload.title) {
      update.slug = createSlug(payload.title);
    } else if (payload.slug === "") {
      delete update.slug;
    }

    const previousBookSeries = await BookSeries.findById(id);
    if (!previousBookSeries) {
      return fail("Book series not found.", 404);
    }

    const bookSeries = await BookSeries.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if ("image" in payload) {
      const removedImages = getRemovedImageUrls(
        [previousBookSeries.image],
        [bookSeries?.image ?? ""]
      );
      await deleteUnusedUploadedImages(removedImages);
    }

    return ok(bookSeries);
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
      return fail("Invalid book series id.", 400);
    }

    const bookSeries = await BookSeries.findByIdAndDelete(id);
    if (!bookSeries) {
      return fail("Book series not found.", 404);
    }

    await deleteUnusedUploadedImages([bookSeries.image]);

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
