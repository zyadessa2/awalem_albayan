import { ZodError } from "zod";

export function ok<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function created<T>(data: T) {
  return ok(data, 201);
}

export function fail(message: string, status = 400, details?: unknown) {
  return Response.json(
    {
      success: false,
      error: {
        message,
        details,
      },
    },
    { status }
  );
}

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    return fail("Validation failed.", 422, error.flatten());
  }

  if (error instanceof Error && error.message === "Unauthorized.") {
    return fail("Unauthorized.", 401);
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    return fail("A record with the same unique value already exists.", 409);
  }

  if (error instanceof Error) {
    return fail(error.message, 500);
  }

  return fail("Something went wrong.", 500);
}
