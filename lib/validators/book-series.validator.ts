import { z } from "zod";
import {
  optionalStringSchema,
  orderSchema,
  publishedSchema,
} from "./common";

export const createBookSeriesSchema = z.object({
  title: z.string().trim().min(1, "Book series title is required."),
  slug: optionalStringSchema,
  description: optionalStringSchema,
  image: optionalStringSchema,
  isPublished: publishedSchema,
  order: orderSchema,
});

export const updateBookSeriesSchema = createBookSeriesSchema.partial();

export type CreateBookSeriesInput = z.infer<typeof createBookSeriesSchema>;
export type UpdateBookSeriesInput = z.infer<typeof updateBookSeriesSchema>;
