import { z } from "zod";
import {
  objectIdArraySchema,
  objectIdSchema,
  optionalStringSchema,
  optionalUrlSchema,
  orderSchema,
  publishedSchema,
} from "./common";

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Book title is required."),
  slug: optionalStringSchema,
  description: optionalStringSchema,
  coverImage: optionalStringSchema,
  previewImages: z.array(z.string().trim()).optional(),
  buyUrl: optionalUrlSchema,
  whatsappUrl: optionalUrlSchema,
  seriesId: z.union([objectIdSchema, z.literal(""), z.null()]).optional(),
  suggestedForCourses: objectIdArraySchema,
  isPublished: publishedSchema,
  order: orderSchema,
});

export const updateBookSchema = createBookSchema.partial();

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
