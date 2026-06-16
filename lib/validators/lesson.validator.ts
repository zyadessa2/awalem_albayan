import { z } from "zod";
import {
  objectIdSchema,
  optionalStringSchema,
  orderSchema,
  publishedSchema,
} from "./common";

export const createLessonSchema = z.object({
  courseId: objectIdSchema,
  title: z.string().trim().min(1, "Lesson title is required."),
  youtubeUrl: z.string().trim().url("Valid YouTube URL is required."),
  duration: optionalStringSchema,
  isLocked: z.coerce.boolean().optional(),
  isPublished: publishedSchema,
  order: orderSchema,
});

export const updateLessonSchema = createLessonSchema.partial();

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
