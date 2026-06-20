type UploadFileInput = {
  buffer: Buffer;
  contentType: string;
  key: string;
};

type HostingerUploadResponse = {
  url?: unknown;
};

const UPLOAD_TIMEOUT_MS = 30_000;

function parseHttpUrl(value: string) {
  const url = new URL(value);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Upload URLs must use HTTP or HTTPS.");
  }

  return url;
}

function getHostingerConfig() {
  const endpoint = process.env.HOSTINGER_UPLOAD_ENDPOINT?.trim();
  const token = process.env.HOSTINGER_UPLOAD_TOKEN?.trim();
  const publicBaseUrl = process.env.HOSTINGER_UPLOAD_PUBLIC_BASE_URL?.trim();

  if (!endpoint || !token || !publicBaseUrl) {
    return null;
  }

  return {
    endpoint: parseHttpUrl(endpoint),
    token,
    publicBaseUrl: parseHttpUrl(publicBaseUrl),
  };
}

function getUploadParts(key: string) {
  const parts = key.split("/").filter(Boolean);

  if (parts.length < 2 || parts[0] !== "uploads" || parts.some((part) => part === "." || part === "..")) {
    throw new Error("Invalid Hostinger upload key.");
  }

  return {
    fileName: parts.at(-1)!,
    folder: parts.slice(1, -1).join("/"),
  };
}

function isUrlInsideBase(url: URL, baseUrl: URL) {
  const basePath = baseUrl.pathname.replace(/\/+$/, "");
  const urlPath = url.pathname.replace(/\/+$/, "");

  return url.origin === baseUrl.origin && (urlPath === basePath || urlPath.startsWith(`${basePath}/`));
}

function parseUploadUrl(data: HostingerUploadResponse, publicBaseUrl: URL) {
  if (typeof data.url !== "string" || !data.url.trim()) {
    throw new Error("Hostinger returned an invalid upload response.");
  }

  const value = data.url.trim();
  const baseDirectoryUrl = new URL(`${publicBaseUrl.href.replace(/\/+$/, "")}/`);
  const uploadUrl = value.startsWith("/")
    ? new URL(value, publicBaseUrl.origin)
    : new URL(value, baseDirectoryUrl);

  // Never persist a URL outside the configured uploads directory.
  if (!isUrlInsideBase(uploadUrl, publicBaseUrl)) {
    throw new Error("Hostinger returned an unexpected upload URL.");
  }

  return uploadUrl.href;
}

export function canUseHostingerUploads() {
  return Boolean(
    process.env.HOSTINGER_UPLOAD_ENDPOINT ||
      process.env.HOSTINGER_UPLOAD_TOKEN ||
      process.env.HOSTINGER_UPLOAD_PUBLIC_BASE_URL
  );
}

export async function uploadFileToHostinger({ buffer, contentType, key }: UploadFileInput) {
  const config = getHostingerConfig();

  if (!config) {
    throw new Error("Hostinger upload configuration is incomplete.");
  }

  const { fileName, folder } = getUploadParts(key);
  const blob = new Blob([Uint8Array.from(buffer)], { type: contentType });
  const formData = new FormData();
  formData.append("file", blob, fileName);

  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "X-Upload-Token": config.token,
    },
    body: formData,
    cache: "no-store",
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Hostinger upload failed with status ${response.status}.`);
  }

  let data: HostingerUploadResponse;

  try {
    data = (await response.json()) as HostingerUploadResponse;
  } catch {
    throw new Error("Hostinger returned a non-JSON upload response.");
  }

  return parseUploadUrl(data, config.publicBaseUrl);
}

export function getHostingerUploadKeyFromUrl(url: string) {
  if (!url) {
    return null;
  }

  try {
    const config = getHostingerConfig();

    if (!config) {
      return null;
    }

    const parsedUrl = new URL(url);

    if (!isUrlInsideBase(parsedUrl, config.publicBaseUrl)) {
      return null;
    }

    return decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ""));
  } catch {
    return null;
  }
}

export async function deleteHostingerUploadsByUrls(urls: string[]) {
  // Hostinger cleanup stays disabled until a protected delete endpoint exists.
  void urls;
  return { deleted: 0 };
}
