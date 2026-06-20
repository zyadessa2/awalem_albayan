import type { NextConfig } from "next";

function getHostingerImagePattern() {
  const publicBaseUrl = process.env.HOSTINGER_UPLOAD_PUBLIC_BASE_URL;

  if (!publicBaseUrl) {
    return null;
  }

  try {
    const url = new URL(publicBaseUrl);
    const protocol = url.protocol.replace(":", "");

    if (protocol !== "http" && protocol !== "https") {
      return null;
    }

    const pathname = `${url.pathname.replace(/\/+$/, "")}/**`;

    return {
      protocol: protocol as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname,
    };
  } catch {
    return null;
  }
}

const hostingerImagePattern = getHostingerImagePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: hostingerImagePattern ? [hostingerImagePattern] : [],
  },
};

export default nextConfig;
