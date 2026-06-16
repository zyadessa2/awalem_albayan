export function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch?.[1]) {
      return embedMatch[1];
    }

    const shortPathMatch = parsedUrl.pathname.match(/\/(?:shorts|live)\/([^/?]+)/);
    if (shortPathMatch?.[1]) {
      return shortPathMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
