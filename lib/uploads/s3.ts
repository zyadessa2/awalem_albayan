// import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// type UploadFileInput = {
//   buffer: Buffer;
//   contentType: string;
//   key: string;
// };

// const UPLOADS_PREFIX = "uploads/";

// function getS3Config() {
//   const region = process.env.AWS_REGION;
//   const bucket = process.env.AWS_S3_BUCKET_NAME;
//   const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
//   const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//   if (!region || !bucket || !accessKeyId || !secretAccessKey) {
//     return null;
//   }

//   return {
//     region,
//     bucket,
//     credentials: {
//       accessKeyId,
//       secretAccessKey,
//     },
//   };
// }

// export function canUseS3Uploads() {
//   return Boolean(getS3Config());
// }

// export async function uploadFileToS3({ buffer, contentType, key }: UploadFileInput) {
//   const config = getS3Config();

//   if (!config) {
//     throw new Error("AWS S3 configuration is incomplete.");
//   }

//   const client = new S3Client({
//     region: config.region,
//     credentials: config.credentials,
//   });

//   await client.send(
//     new PutObjectCommand({
//       Bucket: config.bucket,
//       Key: key,
//       Body: buffer,
//       ContentType: contentType,
//     })
//   );

//   return `https://${config.bucket}.s3.${config.region}.amazonaws.com/${key}`;
// }

// export function getS3UploadKeyFromUrl(url: string) {
//   const config = getS3Config();

//   if (!config || !url) {
//     return null;
//   }

//   try {
//     const parsedUrl = new URL(url);
//     const expectedHost = `${config.bucket}.s3.${config.region}.amazonaws.com`;

//     if (parsedUrl.hostname !== expectedHost) {
//       return null;
//     }

//     const key = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ""));

//     if (!key.startsWith(UPLOADS_PREFIX)) {
//       return null;
//     }

//     return key;
//   } catch {
//     return null;
//   }
// }

// export async function deleteS3UploadsByUrls(urls: string[]) {
//   const config = getS3Config();

//   if (!config) {
//     return { deleted: 0 };
//   }

//   const keys = Array.from(
//     new Set(urls.map(getS3UploadKeyFromUrl).filter((key): key is string => Boolean(key)))
//   );

//   if (keys.length === 0) {
//     return { deleted: 0 };
//   }

//   const client = new S3Client({
//     region: config.region,
//     credentials: config.credentials,
//   });

//   await client.send(
//     new DeleteObjectsCommand({
//       Bucket: config.bucket,
//       Delete: {
//         Objects: keys.map((Key) => ({ Key })),
//         Quiet: true,
//       },
//     })
//   );

//   return { deleted: keys.length };
// }

type UploadFileInput = {
  buffer: Buffer;
  contentType: string;
  key: string;
};

const HOSTINGER_UPLOADS_PREFIX = "uploads/";

function getHostingerConfig() {
  const endpoint = process.env.HOSTINGER_UPLOAD_ENDPOINT;
  const token = process.env.HOSTINGER_UPLOAD_TOKEN;
  const publicBaseUrl = process.env.HOSTINGER_UPLOAD_PUBLIC_BASE_URL;

  if (!endpoint || !token || !publicBaseUrl) {
    return null;
  }

  return { endpoint, token, publicBaseUrl };
}

export function canUseS3Uploads() {
  return Boolean(getHostingerConfig());
}

export async function uploadFileToS3({ buffer, contentType, key }: UploadFileInput) {
  const config = getHostingerConfig();

  if (!config) {
    throw new Error("Hostinger upload configuration is incomplete.");
  }

const arrayBuffer = buffer.buffer.slice(
  buffer.byteOffset,
  buffer.byteOffset + buffer.byteLength
) as ArrayBuffer;

const blob = new Blob([arrayBuffer], { type: contentType });  const fileName = key.split("/").pop() || `file-${Date.now()}`;
  const folder = key.includes("/") ? key.split("/")[1] || "images" : "images";

  const formData = new FormData();
  formData.append("file", blob, fileName);
  formData.append("folder", folder);

  const res = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "X-Upload-Token": config.token,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file to Hostinger.");
  }

  const data = await res.json();

  return data.url as string;
}

export function getS3UploadKeyFromUrl(url: string) {
  const config = getHostingerConfig();

  if (!config || !url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const baseUrl = new URL(config.publicBaseUrl);

    if (parsedUrl.hostname !== baseUrl.hostname) {
      return null;
    }

    const key = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ""));

    if (!key.startsWith(HOSTINGER_UPLOADS_PREFIX)) {
      return null;
    }

    return key;
  } catch {
    return null;
  }
}

export async function deleteS3UploadsByUrls(urls: string[]) {
  // مؤقتًا خليه مايحذفش من Hostinger
  // بعد ما الرفع يشتغل نضيف delete.php
  return { deleted: 0 };
}