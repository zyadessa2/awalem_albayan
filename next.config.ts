// import type { NextConfig } from "next";

// const s3Host =
//   process.env.AWS_S3_BUCKET_NAME && process.env.AWS_REGION
//     ? `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
//     : undefined;

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: s3Host
//       ? [
//           {
//             protocol: "https",
//             hostname: s3Host,
//             pathname: "/uploads/**",
//           },
//         ]
//       : [],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const s3Host =
  process.env.AWS_S3_BUCKET_NAME && process.env.AWS_REGION
    ? `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
    : undefined;

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "files.awalimalbayan.com",
    pathname: "/uploads/**",
  },
];

if (s3Host) {
  remotePatterns.push({
    protocol: "https",
    hostname: s3Host,
    pathname: "/uploads/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;