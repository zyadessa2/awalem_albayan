import { cookies } from "next/headers";
import { z } from "zod";
import { connectMongoDB } from "@/lib/mongoose";
import { fail, handleRouteError, ok, readJson } from "@/lib/utils/api";
import { verifyPassword } from "@/lib/auth/password";
import { ADMIN_SESSION_COOKIE, createAdminSession } from "@/lib/auth/session";
import { checkRateLimit, clearRateLimit, getClientKey } from "@/lib/auth/rate-limit";
import Admin from "@/models/Admin";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    const limit = checkRateLimit(clientKey);

    if (!limit.allowed) {
      return fail("Too many login attempts. Please try again later.", 429, {
        resetAt: new Date(limit.resetAt).toISOString(),
      });
    }

    await connectMongoDB();

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = loginSchema.parse(body);
    const admin = await Admin.findOne({ email: payload.email.toLowerCase(), isActive: true });

    if (!admin || !(await verifyPassword(payload.password, admin.passwordHash))) {
      return fail("Invalid email or password.", 401);
    }

    clearRateLimit(clientKey);

    const token = await createAdminSession({
      adminId: admin._id.toString(),
      email: admin.email,
    });

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return ok({ admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    return handleRouteError(error);
  }
}
