import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type UploadFileInput = {
  buffer: Buffer;
  contentType: string;
  key: string;
};

const UPLOADS_PREFIX = "uploads/";

function getS3Config() {
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !bucket || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return {
    region,
    bucket,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  };
}

export function canUseS3Uploads() {
  return Boolean(getS3Config());
}

export async function uploadFileToS3({ buffer, contentType, key }: UploadFileInput) {
  const config = getS3Config();

  if (!config) {
    throw new Error("AWS S3 configuration is incomplete.");
  }

  const client = new S3Client({
    region: config.region,
    credentials: config.credentials,
  });

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `https://${config.bucket}.s3.${config.region}.amazonaws.com/${key}`;
}

export function getS3UploadKeyFromUrl(url: string) {
  const config = getS3Config();

  if (!config || !url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const expectedHost = `${config.bucket}.s3.${config.region}.amazonaws.com`;

    if (parsedUrl.hostname !== expectedHost) {
      return null;
    }

    const key = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ""));

    if (!key.startsWith(UPLOADS_PREFIX)) {
      return null;
    }

    return key;
  } catch {
    return null;
  }
}

export async function deleteS3UploadsByUrls(urls: string[]) {
  const config = getS3Config();

  if (!config) {
    return { deleted: 0 };
  }

  const keys = Array.from(
    new Set(urls.map(getS3UploadKeyFromUrl).filter((key): key is string => Boolean(key)))
  );

  if (keys.length === 0) {
    return { deleted: 0 };
  }

  const client = new S3Client({
    region: config.region,
    credentials: config.credentials,
  });

  await client.send(
    new DeleteObjectsCommand({
      Bucket: config.bucket,
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
        Quiet: true,
      },
    })
  );

  return { deleted: keys.length };
}
