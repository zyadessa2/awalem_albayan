import { z } from "zod";
import {
  objectIdArraySchema,
  optionalStringSchema,
  optionalUrlSchema,
  orderSchema,
  publishedSchema,
} from "./common";

export const createCourseSchema = z.object({
  title: z.string().trim().min(1, "Course title is required."),
  slug: optionalStringSchema,
  description: optionalStringSchema,
  image: optionalStringSchema,
  youtubePlaylistUrl: optionalUrlSchema,
  suggestedBooks: objectIdArraySchema,
  isPublished: publishedSchema,
  order: orderSchema,
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
