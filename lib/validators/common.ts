import { z } from "zod";

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId.");

export const optionalStringSchema = z
  .string()
  .trim()
  .optional();

export const optionalUrlSchema = z
  .union([z.string().trim().url(), z.literal("")])
  .optional();

export const orderSchema = z.coerce.number().int().min(0).optional();

export const publishedSchema = z.coerce.boolean().optional();

export const objectIdArraySchema = z.array(objectIdSchema).optional();
