import { connectMongoDB } from "@/lib/mongoose";
import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { isValidObjectId } from "@/lib/utils/mongo";
import { createSlug } from "@/lib/utils/slug";
import { updateBookSchema } from "@/lib/validators/book.validator";
import { requireAdminSession } from "@/lib/auth/session";
import { deleteUnusedUploadedImages, getRemovedImageUrls } from "@/lib/uploads/image-cleanup";
import Book from "@/models/Book";
import "@/models/BookSeries";
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
      return fail("Invalid book id.", 400);
    }

    const book = await Book.findById(id)
      .populate("seriesId")
      .populate("suggestedForCourses")
      .lean();

    if (!book) {
      return fail("Book not found.", 404);
    }

    return ok(book);
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
      return fail("Invalid book id.", 400);
    }

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = updateBookSchema.parse(body);
    const update: Record<string, unknown> = { ...payload };

    if (!payload.slug && payload.title) {
      update.slug = createSlug(payload.title);
    } else if (payload.slug === "") {
      delete update.slug;
    }

    if (payload.seriesId === "") {
      update.seriesId = null;
    }

    const previousBook = await Book.findById(id);
    if (!previousBook) {
      return fail("Book not found.", 404);
    }

    const book = await Book.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    const removedImages = [
      ...("coverImage" in payload
        ? getRemovedImageUrls([previousBook.coverImage], [book?.coverImage ?? ""])
        : []),
      ...("previewImages" in payload
        ? getRemovedImageUrls(previousBook.previewImages ?? [], book?.previewImages ?? [])
        : []),
    ];

    if (removedImages.length > 0) {
      await deleteUnusedUploadedImages(removedImages);
    }

    return ok(book);
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
      return fail("Invalid book id.", 400);
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return fail("Book not found.", 404);
    }

    await deleteUnusedUploadedImages([book.coverImage, ...(book.previewImages ?? [])]);

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
