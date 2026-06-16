import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(120),
  phone: z.string().trim().min(5, "Phone is required.").max(40),
  email: z.string().trim().email("Valid email is required."),
  message: z.string().trim().min(5, "Message is required.").max(2000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
