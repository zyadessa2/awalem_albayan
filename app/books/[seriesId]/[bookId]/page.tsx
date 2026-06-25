import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Almarai } from "next/font/google";
import BookPreviewGallery from "@/components/books/BookPreviewGallery";
import JsonLd from "@/components/seo/JsonLd";
import { getPublishedBook } from "@/lib/data/content";
import { absoluteUrl, createPageMetadata, SITE_NAME, trimDescription } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PublishedBook = NonNullable<Awaited<ReturnType<typeof getPublishedBook>>>;

function bookMatchesRoute(book: PublishedBook, seriesId: string) {
  let normalizedSeriesId = seriesId;
  try {
    normalizedSeriesId = decodeURIComponent(seriesId);
  } catch {
    // The original value is still safe to compare and will fail closed.
  }

  if (normalizedSeriesId === "standalone") {
    return !book.seriesId;
  }

  if (!book.seriesId) {
    return false;
  }

  if (typeof book.seriesId === "string") {
    return book.seriesId === normalizedSeriesId;
  }

  return book.seriesId._id === normalizedSeriesId || book.seriesId.slug === normalizedSeriesId;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seriesId: string; bookId: string }>;
}) {
  const { seriesId, bookId } = await params;
  const book = await getPublishedBook(bookId);

  if (!book || !bookMatchesRoute(book, seriesId)) {
    return createPageMetadata({
      title: "كتاب تعليمي",
      path: `/books/${seriesId}/${bookId}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: book.title,
    description: trimDescription(book.description),
    path: `/books/${seriesId}/${book.slug || bookId}`,
    image: book.coverImage || "/book-product.png",
  });
}

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

function BackLink({ seriesId }: { seriesId: string }) {
  const href = seriesId === "standalone" ? "/books" : `/books/${seriesId}`;

  return (
    <Link href={href} className="group inline-flex items-center gap-3 text-base font-extrabold text-[#141219] sm:text-xl">
      <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#fdeef5] transition group-hover:bg-[#f8ddec]">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 5L8 12L15 19" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="underline decoration-2 underline-offset-4">الرجوع للكتب</span>
    </Link>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.02Z" fill="currentColor" opacity=".22" />
      <path d="M12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 1 1 6.98 3.85Zm4.5-6.15c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.13-.55.13-.16.24-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.01-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.24.25-.4.08-.16.04-.3-.02-.42-.06-.13-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.03s.87 2.35 1 2.51c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" fill="currentColor" />
    </svg>
  );
}

function PreviewBackground() {
  return (
    <div className="absolute inset-0 bg-[#eef8e8]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(111,178,62,0.1),transparent_28%),radial-gradient(circle_at_82%_50%,rgba(111,178,62,0.08),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(30px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(22px_16px_at_78px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:100px_44px]" />
      <div className="absolute inset-x-0 bottom-0 h-16 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(30px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(22px_16px_at_78px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:100px_44px]" />
    </div>
  );
}

export default async function BookDetailsPage({ params }: { params: Promise<{ seriesId: string; bookId: string }> }) {
  const { seriesId, bookId } = await params;
  const book = await getPublishedBook(bookId);
  if (!book || !bookMatchesRoute(book, seriesId)) {
    notFound();
  }

  const title = book.title;
  const description = book.description || "كتاب تعليمي يساعد الطفل على تنمية مهارات القراءة والنطق بثقة.";
  const actionUrl = book.whatsappUrl || book.buyUrl || "https://wa.me/201033768477";
  const bookJsonLd = {
        "@context": "https://schema.org",
        "@type": "Book",
        name: book.title,
        description: trimDescription(book.description),
        image: absoluteUrl(book.coverImage || "/book-product.png"),
        url: absoluteUrl(`/books/${seriesId}/${book.slug || bookId}`),
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
        },
      };

  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <JsonLd data={bookJsonLd} />
      <section className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-[128px] sm:px-6 sm:pt-[150px] lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pb-16">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative h-[230px] w-[230px] rounded-[22px] bg-[#fef6ea] sm:h-[286px] sm:w-[286px]">
            <Image src={book.coverImage || "/book-product.png"} alt={title} fill sizes="286px" className="scale-110 object-contain object-center drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]" priority />
          </div>
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-right">
          <div className="mb-7 flex justify-center lg:justify-start">
            <BackLink seriesId={seriesId} />
          </div>

          <h1 className="text-[34px] font-extrabold leading-normal text-[#141219] sm:text-[46px]">{title}</h1>
          <p className="mx-auto mt-4 max-w-[850px] text-base font-bold leading-8 text-[#525252] sm:text-xl sm:leading-9 lg:mx-0">{description}</p>

          <a href={actionUrl} className="mx-auto mt-6 flex h-[58px] w-[260px] items-center justify-center gap-2 rounded-[18px] bg-[#6dba3d] text-lg font-extrabold text-white transition hover:bg-[#5ca834] lg:mx-0">
            شراء الكتاب
            <WhatsAppIcon />
          </a>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-24">
        <PreviewBackground />
        <div className="relative z-10 mx-auto max-w-7xl text-center lg:text-right">
          <h2 className="text-3xl font-extrabold leading-normal text-[#141219] sm:text-4xl">
            معاينة من داخل <span className="text-[#f4a62a]">الكتاب</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base font-bold leading-8 text-[#525252] sm:text-xl lg:mx-0">
            تصفح بعض الصفحات من داخل الكتاب للتعرف على أسلوب الشرح والتدريبات التعليمية.
          </p>
        </div>

        <div className="relative z-10 mt-12">
          <BookPreviewGallery images={book.previewImages} />
        </div>
      </section>
    </main>
  );
}
