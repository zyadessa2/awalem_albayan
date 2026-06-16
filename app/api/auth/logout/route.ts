import { cookies } from "next/headers";
import { ok } from "@/lib/utils/api";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  return ok({ loggedOut: true });
}
