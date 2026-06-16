import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { EmailConfigurationError, sendContactMessage } from "@/lib/mail/contact";
import { contactMessageSchema } from "@/lib/validators/contact.validator";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = contactMessageSchema.parse(body);
    await sendContactMessage(payload);

    return ok({ sent: true }, 201);
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return fail("Email service is not configured yet.", 503);
    }

    return handleRouteError(error);
  }
}
