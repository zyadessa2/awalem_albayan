import type { NextConfig } from "next";

const s3Host =
  process.env.AWS_S3_BUCKET_NAME && process.env.AWS_REGION
    ? `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
    : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: s3Host
      ? [
          {
            protocol: "https",
            hostname: s3Host,
            pathname: "/uploads/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
