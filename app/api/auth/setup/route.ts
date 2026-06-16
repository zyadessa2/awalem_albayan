import { cookies } from "next/headers";
import { connectMongoDB } from "@/lib/mongoose";
import { created, fail, handleRouteError, readJson } from "@/lib/utils/api";
import { createAdminSchema } from "@/lib/validators/admin.validator";
import { hashPassword } from "@/lib/auth/password";
import { ADMIN_SESSION_COOKIE, createAdminSession } from "@/lib/auth/session";
import Admin from "@/models/Admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectMongoDB();
    const count = await Admin.countDocuments();
    return Response.json({ success: true, data: { needsSetup: count === 0 } });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const count = await Admin.countDocuments();
    if (count > 0) {
      return fail("Admin setup is already completed.", 409);
    }

    const body = await readJson(request);
    if (!body) {
      return fail("Invalid JSON body.", 400);
    }

    const payload = createAdminSchema.parse(body);
    const admin = await Admin.create({
      name: payload.name,
      email: payload.email,
      passwordHash: await hashPassword(payload.password),
    });

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

    return created({ admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    return handleRouteError(error);
  }
}
