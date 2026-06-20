import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdminSession } from "@/lib/auth/session";
import { fail, handleRouteError, ok } from "@/lib/utils/api";
import {
  canUseHostingerUploads,
  uploadFileToHostinger,
} from "@/lib/uploads/hostinger";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function safeFileName(name: string) {
  const extension = path.extname(name).toLowerCase();
  const baseName = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${baseName || "upload"}-${Date.now()}${extension}`;
}

function createUploadKey(fileName: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `uploads/${year}/${month}/${fileName}`;
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return fail("No file uploaded.", 400);
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return fail("Only image files are allowed.", 422);
    }

    if (file.size > MAX_FILE_SIZE) {
      return fail("File size must be 5MB or less.", 422);
    }

    const fileName = safeFileName(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());

    if (canUseHostingerUploads()) {
      const url = await uploadFileToHostinger({
        buffer,
        contentType: file.type,
        key: createUploadKey(fileName),
      });

      return ok({ url, storage: "hostinger" }, 201);
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    return ok({ url: `/uploads/${fileName}`, storage: "local" }, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
