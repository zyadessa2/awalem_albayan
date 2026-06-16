import Image from "next/image";
import Link from "next/link";
import { Almarai } from "next/font/google";
import ProductCard from "@/components/home/ProductCard";
import {
  getPublishedBookSeriesByIdentifier,
  getPublishedBooksBySeries,
} from "@/lib/data/content";

export const dynamic = "force-dynamic";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

function BackLink() {
  return (
    <Link href="/books" className="group inline-flex items-center gap-3 text-base font-extrabold text-[#141219] sm:text-xl">
      <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#fdeef5] transition group-hover:bg-[#f8ddec]">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 5L8 12L15 19" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="underline decoration-2 underline-offset-4">الرجوع لسلاسل الكتب</span>
    </Link>
  );
}

function PageTexture() {
  return (
    <div className="absolute inset-0 bg-[#eef8e8]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_30%,rgba(111,178,62,0.1),transparent_28%),radial-gradient(circle_at_85%_54%,rgba(111,178,62,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-16 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(30px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(22px_16px_at_78px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:100px_44px]" />
      <div className="absolute inset-x-0 bottom-0 h-16 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(30px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(22px_16px_at_78px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:100px_44px]" />
    </div>
  );
}

export default async function SeriesDetailsPage({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params;
  const series = await getPublishedBookSeriesByIdentifier(seriesId);
  const books = series ? await getPublishedBooksBySeries(series._id) : [];

  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <section className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-8 pt-[128px] sm:px-6 sm:pb-12 sm:pt-[150px] lg:flex-row lg:items-end lg:gap-14">
        <div className="order-2 flex-1 text-center lg:order-1 lg:text-right">
          <div className="mb-5 flex justify-center lg:justify-start">
            <BackLink />
          </div>

          <h1 className="text-[32px] font-extrabold leading-normal text-[#141219] sm:text-[42px] lg:text-5xl">
            {series?.title || "سلسلة كتب نور البيان"}
          </h1>

          <p className="mx-auto mt-4 max-w-[930px] text-base font-bold leading-8 text-[#525252] sm:text-xl sm:leading-9 lg:mx-0">
            {series?.description || "سلاسل تعليمية وكتب تساعد الأطفال على التعلم بأسلوب بسيط وممتع."}
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:w-[240px] lg:justify-start">
          <div className="relative h-[180px] w-[180px] rounded-[20px] bg-[#fef6ea] sm:h-[214px] sm:w-[206px]">
            <Image src={series?.image || "/book-product.png"} alt={series?.title || "سلسلة كتب"} fill sizes="220px" className="scale-110 object-contain object-center drop-shadow-[0_12px_16px_rgba(0,0,0,0.16)]" priority />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:pb-28 lg:pt-24">
        <PageTexture />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="mb-32 text-center text-4xl font-extrabold leading-normal text-[#141219] lg:mb-32 lg:text-right lg:text-5xl">
            كتب <span className="text-[#f4a62a]">السلسلة</span>
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-36 md:grid-cols-2 xl:grid-cols-4">
            {books.map((book) => (
              <ProductCard key={book._id} title={book.title} description={book.description} button="شراء الكتاب" imageSrc={book.coverImage || "/book-product.png"} kind="book" showBookCount={false} href={`/books/${seriesId}/${book._id}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
