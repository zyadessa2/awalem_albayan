import type { Metadata } from "next";

export const SITE_NAME = "عوالم البيان";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.awalimalbayan.com").replace(/\/$/, "");
export const DEFAULT_OG_IMAGE = "/awalim-icon-512.png";
export const DEFAULT_DESCRIPTION =
  "عوالم البيان منظومة تعليمية عربية للأطفال تقدم دورات وكتب وسلاسل تعليمية تساعد الطفل على القراءة والفهم وبناء مهارات اللغة العربية بثقة ومتعة.";
export const SITE_ALTERNATE_NAMES = ["Awalim Al Bayan", "Awalim Albayan", "عوالم البيان ناشرون"];

export const SEO_KEYWORDS = [
  "عوالم البيان",
  "نور البيان",
  "تعليم الأطفال",
  "تعلم القراءة للأطفال",
  "اللغة العربية للأطفال",
  "دورات تعليمية للأطفال",
  "كتب تعليمية للأطفال",
  "سلاسل كتب تعليمية",
  "منهج نور البيان",
  "تعليم القراءة العربية",
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: {
  title?: string | { absolute: string };
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const displayTitle = typeof title === "string" ? title : title?.absolute;
  const socialTitle = displayTitle && displayTitle !== SITE_NAME ? `${displayTitle} | ${SITE_NAME}` : SITE_NAME;

  return {
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    other: {
      "alternate-name": SITE_ALTERNATE_NAMES,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function trimDescription(value?: string, fallback = DEFAULT_DESCRIPTION) {
  const description = value?.replace(/\s+/g, " ").trim() || fallback;

  return description.length > 155 ? `${description.slice(0, 152)}...` : description;
}
