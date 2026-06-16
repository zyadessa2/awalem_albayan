import { fail, handleRouteError, ok } from "@/lib/utils/api";
import { getCurrentAdminSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getCurrentAdminSession();

    if (!session) {
      return fail("Unauthorized.", 401);
    }

    return ok({ admin: session });
  } catch (error) {
    return handleRouteError(error);
  }
}
