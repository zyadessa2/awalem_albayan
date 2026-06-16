import Image from "next/image";
import Link from "next/link";
import { Almarai } from "next/font/google";
import ProductCard from "@/components/home/ProductCard";
import {
  getPublishedBookSeries,
  getPublishedStandaloneBooks,
} from "@/lib/data/content";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "الكتب التعليمية",
  description: "تصفح سلاسل الكتب والكتب التعليمية المنفصلة من عوالم البيان لتنمية مهارات القراءة واللغة العربية عند الأطفال.",
  path: "/books",
  image: "/book-product.png",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

type SeriesCardItem = {
  id: string | number;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  bookCount?: number;
};

const fallbackSeries = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  tag: index % 2 === 0 ? "الأكثر مبيعا" : "الأكثر شهرة",
  title: "سلسلة كتب نور البيان",
  description: "تعلم مع سلسلة نور البيان لبناء مهارات الأطفال في القراءة والتعلم.",
  imageSrc: "/book-product.png",
}));

function OrangeStroke({ className = "" }: { className?: string }) {
  return (
    <svg className={`mt-2 h-[17px] w-[253px] max-w-full ${className}`} width="249" height="18" viewBox="0 0 249 18" fill="none" aria-hidden>
      <path
        d="M8.87091 0.311192L3.23512 2.03868C2.77574 2.17949 2.38241 2.48097 2.12707 2.88797L0.305804 5.7909C-0.134782 6.49316 -0.0964468 7.39442 0.40218 8.05673L1.92285 10.0766C2.3007 10.5785 2.89242 10.8736 3.52065 10.8736H11.4125C11.7702 10.8736 12.1213 10.9696 12.4293 11.1514L16.4388 13.5184C16.962 13.8272 17.5972 13.8815 18.1652 13.6659L25.1801 11.0038C25.4068 10.9177 25.6472 10.8736 25.8897 10.8736H38.7433C38.9708 10.8736 39.1966 10.9125 39.4111 10.9884L47.3622 13.8047C47.7345 13.9366 48.1375 13.9553 48.5205 13.8584L59.8747 10.9858C60.1663 10.912 60.4709 10.9049 60.7656 10.9652L75.453 13.9665C75.5848 13.9934 75.7189 14.007 75.8534 14.007H87.7305C87.9328 14.007 88.134 14.0377 88.3271 14.098L97.4462 16.948C97.8462 17.0731 98.2754 17.0693 98.6731 16.9372L107.19 14.1089C107.394 14.0414 107.606 14.0065 107.82 14.0086C109.689 14.0265 113.095 14.1995 113.984 14.7903C114.884 15.3878 124.433 12.7096 129.75 11.101C130.233 10.9551 130.75 10.9955 131.203 11.2147L136.115 13.5868C136.664 13.8523 137.305 13.8523 137.854 13.5868L142.67 11.261C143.18 11.0144 143.771 10.9961 144.296 11.2106L150.775 13.8583C151.015 13.9565 151.272 14.007 151.531 14.007H166.211C166.384 14.007 166.556 13.9844 166.724 13.9399L178.014 10.9407C178.182 10.8962 178.354 10.8736 178.528 10.8736H193.207C193.466 10.8736 193.723 10.9241 193.964 11.0223L200.399 13.6525C200.949 13.8771 201.57 13.8459 202.094 13.5673L206.112 11.4327C206.76 11.0883 207.545 11.1267 208.157 11.5329L211.05 13.4542C211.574 13.8022 212.231 13.8834 212.824 13.6734L220.116 11.0903C220.514 10.9495 220.946 10.9379 221.35 11.0573L230.639 13.7991C231.094 13.9333 231.581 13.9016 232.015 13.7097L238.034 11.0449C238.289 10.932 238.564 10.8736 238.843 10.8736H247.078C248.628 10.8736 249.196 8.83409 247.869 8.03294L247.793 7.98725C246.947 7.47625 246.839 6.29095 247.579 5.6355C248.455 4.86024 248.114 3.4222 246.984 3.12195L244.036 2.33883C243.832 2.28461 243.621 2.26305 243.41 2.27497L216.941 3.77105C216.351 3.8044 215.776 3.57518 215.371 3.14489L213.936 1.62012C213.403 1.0531 212.589 0.847311 211.85 1.09269L204.55 3.51652C203.967 3.71038 203.326 3.6248 202.814 3.28448L202.18 2.86365C201.611 2.48574 200.888 2.42438 200.264 2.70093L198.947 3.2839C198.209 3.61075 197.347 3.46171 196.761 2.90603L194.378 0.644969C193.892 0.184011 193.208 -0.00316754 192.555 0.146337L177.952 3.49058C177.089 3.68816 176.199 3.29514 175.764 2.52441L175.429 1.93096C175.009 1.18844 174.165 0.793404 173.327 0.947071L159.848 3.41649C158.984 3.57467 158.338 2.64013 158.791 1.88822C159.248 1.12911 158.586 0.188461 157.717 0.363296L141.498 3.62733C140.884 3.75098 140.247 3.57946 139.778 3.16397L137.83 1.43865C137.305 0.974196 136.576 0.818052 135.907 1.02704L128.458 3.35505C127.578 3.6301 126.624 3.26784 126.148 2.47798L125.325 1.11125C124.89 0.388724 124.048 0.0168689 123.221 0.181679L113.104 2.19741C112.906 2.2369 112.703 2.24612 112.502 2.22477L98.7195 0.760249C98.2922 0.714838 97.8616 0.808292 97.4915 1.02677L93.5089 3.37783C93.0276 3.66199 92.4493 3.73175 91.9142 3.57021L80.4484 0.108963C80.0152 -0.0218133 79.5505 -0.00181281 79.1301 0.165697L74.8556 1.86899C74.2458 2.11198 73.5556 2.04027 73.0088 1.67711L72.4791 1.32534C71.89 0.934078 71.1338 0.897048 70.5093 1.22887L69.3399 1.85016C68.9339 2.06589 68.4307 1.8758 68.2688 1.44551C68.1144 1.03554 67.6472 0.839655 67.2466 1.017L65.6961 1.70351C65.1078 1.96398 64.446 1.53325 64.446 0.889861C64.446 0.363552 63.9917 -0.0477583 63.468 0.00441407L41.3815 2.20465C41.0373 2.23895 40.69 2.18335 40.3736 2.04327L37.803 0.905119C37.485 0.764351 37.1359 0.708904 36.79 0.744246L22.6767 2.18625C22.3064 2.22409 21.9845 1.93342 21.9845 1.56111C21.9845 1.1325 21.5648 0.829668 21.1581 0.964743L18.3242 1.90578C17.8036 2.07864 17.2665 1.69108 17.2665 1.14255C17.2665 0.561072 16.6684 0.171789 16.1367 0.407199L13.3874 1.6245C12.5508 1.99487 11.5694 1.73974 11.0192 1.00887C10.5212 0.347455 9.66246 0.0685622 8.87091 0.311192Z"
        fill="#F4A62A"
      />
    </svg>
  );
}

function PageHero() {
  return (
    <section className="relative mt-[102px] min-h-[324px] overflow-hidden bg-[#edf7e8] sm:mt-[116px]">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#edf7e8]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(111,178,62,0.24),transparent_34%),radial-gradient(circle_at_82%_45%,rgba(111,178,62,0.18),transparent_32%),linear-gradient(90deg,rgba(111,178,62,0.16),rgba(111,178,62,0.08))]" />
      </div>
      <div className="relative z-10 flex min-h-[324px] items-center justify-center px-4 text-center">
        <h1 className="font-qalbi text-[58px] font-normal leading-normal sm:text-[76px] lg:text-[96px]">
          <span className="text-[#6fb23e]">سلاسل</span>{" "}
          <span className="text-[#c2187a]">الكتب</span>
        </h1>
      </div>
    </section>
  );
}

function SectionTitle({ black, pink }: { black: string; pink: string }) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
        {black} <span className="text-[#c2187a]">{pink}</span>
      </h2>
      <p className="mt-2 text-lg font-bold leading-8 text-[#525252] md:text-2xl">
        سلاسل تعليمية تسهم في بناء مهارات الطفل بثقة ومتعة.
      </p>
      <OrangeStroke />
    </div>
  );
}

function BookCountIcon({ className = "h-[19px] w-[19px]" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 19 19" fill="none" aria-hidden>
      <path d="M5.7395 5.54175C5.7395 5.38428 5.80206 5.23325 5.91341 5.1219C6.02476 5.01055 6.17578 4.948 6.33325 4.948H12.6666C12.8241 4.948 12.9751 5.01055 13.0864 5.1219C13.1978 5.23325 13.2603 5.38428 13.2603 5.54175C13.2603 5.69922 13.1978 5.85024 13.0864 5.96159C12.9751 6.07294 12.8241 6.1355 12.6666 6.1355H6.33325C6.17578 6.1355 6.02476 6.07294 5.91341 5.96159C5.80206 5.85024 5.7395 5.69922 5.7395 5.54175ZM6.33325 7.71883C6.17578 7.71883 6.02476 7.78139 5.91341 7.89274C5.80206 8.00409 5.7395 8.15511 5.7395 8.31258C5.7395 8.47005 5.80206 8.62108 5.91341 8.73243C6.02476 8.84378 6.17578 8.90633 6.33325 8.90633H10.2916C10.4491 8.90633 10.6001 8.84378 10.7114 8.73243C10.8228 8.62108 10.8853 8.47005 10.8853 8.31258C10.8853 8.15511 10.8228 8.00409 10.7114 7.89274C10.6001 7.78139 10.4491 7.71883 10.2916 7.71883H6.33325Z" fill="#C2187A" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.87321 0.989502C6.791 0.989502 5.91779 0.989502 5.23141 1.08213C4.51891 1.17713 3.91883 1.38296 3.44225 1.85875C2.96566 2.33534 2.76141 2.93542 2.66562 3.64792C2.573 4.33429 2.573 5.2075 2.573 6.28971V12.7101C2.573 13.7923 2.573 14.6655 2.66562 15.3519C2.76062 16.0644 2.96646 16.6645 3.44225 17.1411C3.91883 17.6177 4.51891 17.8219 5.23141 17.9185C5.91779 18.0103 6.791 18.0103 7.87321 18.0103H11.127C12.2092 18.0103 13.0824 18.0103 13.7687 17.9185C14.4812 17.8219 15.0813 17.6177 15.5579 17.1411C16.0345 16.6645 16.2387 16.0644 16.3353 15.3519C16.4272 14.6655 16.4272 13.7923 16.4272 12.7101V6.28971C16.4272 5.2075 16.4272 4.33429 16.3353 3.64792C16.2387 2.93542 16.0345 2.33534 15.5579 1.85875C15.0813 1.38217 14.4812 1.17792 13.7687 1.08213C13.0824 0.989502 12.2092 0.989502 11.127 0.989502H7.87321ZM4.283 2.69871C4.50229 2.47942 4.80946 2.33692 5.39133 2.25854C5.98825 2.17859 6.7815 2.177 7.91754 2.177H11.0842C12.2202 2.177 13.0127 2.17859 13.6112 2.25854C14.1923 2.33692 14.4995 2.48021 14.7187 2.69871C14.938 2.918 15.0805 3.22517 15.1589 3.80704C15.2389 4.40396 15.2405 5.19721 15.2405 6.33325V12.0728H6.16083C5.51325 12.0728 5.0715 12.0728 4.69229 12.1742C4.35911 12.2643 4.04391 12.411 3.7605 12.608V6.33325C3.7605 5.19721 3.76208 4.40396 3.84204 3.80625C3.92041 3.22517 4.0645 2.918 4.283 2.69871ZM3.78187 14.447C3.79375 14.7273 3.81275 14.9735 3.84204 15.1936C3.92041 15.7747 4.06371 16.0818 4.28221 16.3011C4.5015 16.5204 4.80866 16.6629 5.39054 16.7413C5.98746 16.8213 6.78071 16.8228 7.91675 16.8228H11.0834C12.2195 16.8228 13.0119 16.8213 13.6104 16.7413C14.1915 16.6629 14.4987 16.5196 14.718 16.3011C14.9372 16.0818 15.0797 15.7747 15.1581 15.1928C15.2238 14.7059 15.2365 14.0884 15.2389 13.2603H6.25266C5.47841 13.2603 5.20766 13.2651 4.99946 13.3213C4.72043 13.3961 4.46379 13.5377 4.25167 13.7338C4.03956 13.93 3.87832 14.1747 3.78187 14.447Z" fill="#C2187A" />
    </svg>
  );
}

function SeriesCard({ item }: { item: SeriesCardItem }) {
  return (
    <article className="relative mx-auto grid min-h-[330px] w-full max-w-[624px] gap-6 rounded-[42px] bg-white p-8 text-center shadow-[2px_3px_40px_rgba(0,0,0,0.16)] sm:grid-cols-[188px_minmax(0,1fr)] sm:items-center sm:text-right sm:[direction:ltr]">
      <div className="relative mx-auto h-[170px] w-[170px] rounded-[20px] bg-[#fef6ea] sm:h-[196px] sm:w-[178px]">
        <Image src={item.imageSrc} alt={item.title} fill sizes="190px" className="scale-110 object-contain object-center" />
      </div>
      <div className="flex min-w-0 flex-col items-center sm:items-start sm:[direction:rtl]">
        <span className="mb-3 rounded-full bg-[#c2187a] px-5 py-1.5 text-xs font-extrabold text-white">
          {item.tag}
        </span>
        <h3 className="w-full text-center text-2xl font-extrabold leading-normal text-[#6fb23e] sm:text-right">
          {item.title}
        </h3>
        <p className="mt-2 w-full overflow-hidden text-center text-base font-bold leading-[26px] text-[#525252] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-right sm:[-webkit-line-clamp:2]">
          {item.description}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs font-normal leading-[26px] text-[#525252]">
          <BookCountIcon /> {item.bookCount ?? 0} كتب
        </div>
        <Link href={`/books/${item.id}`} className="mt-3 flex h-12 w-[190px] items-center justify-center rounded-xl bg-[#6dba3d] text-base font-extrabold text-white transition hover:bg-[#5ca834]">
          تفاصيل السلسلة
        </Link>
      </div>
    </article>
  );
}

function SingleBooksBackground() {
  return (
    <div className="absolute inset-0 bg-[#eef8e8]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(111,178,62,0.1),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(111,178,62,0.09),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
      <div className="absolute inset-x-0 bottom-0 h-14 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
    </div>
  );
}

function GirlBooksDecoration() {
  return (
    <div className="pointer-events-none absolute -top-24 left-4 z-20 hidden h-[260px] w-[300px] rotate-[8deg] lg:block" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 146 141" fill="none">
        <path d="M67.9312 7.90479C82.7908 -5.73393 106.606 -1.11691 115.292 17.0866L128.287 44.3191L140.52 62.8419C150.17 77.4542 145.306 97.1913 129.971 105.646L108.175 117.663L78.0573 136.212C63.1696 145.381 43.6269 139.927 35.6389 124.374L20.2389 94.3886C18.9488 91.8765 17.3104 89.5593 15.3723 87.5053L8.21377 79.9189C-8.46519 62.2431 1.6949 33.1087 25.7485 29.6375L38.5322 27.7927C44.5082 26.9304 50.0849 24.2848 54.5332 20.202L67.9312 7.90479Z" fill="#C5E0B2" />
      </svg>
      <div className="absolute left-8 top-0 h-[230px] w-[230px]">
        <Image src="/girl_books.png" alt="" fill sizes="230px" className="object-contain object-center" />
      </div>
    </div>
  );
}

export default async function BooksPage() {
  const [publishedSeries, publishedStandaloneBooks] = await Promise.all([
    getPublishedBookSeries(),
    getPublishedStandaloneBooks(),
  ]);

  const visibleSeries: SeriesCardItem[] =
    publishedSeries.length > 0
      ? publishedSeries.map((item, index) => ({
          id: item._id,
          tag: index % 2 === 0 ? "الأكثر مبيعا" : "الأكثر شهرة",
          title: item.title,
          description: item.description,
          imageSrc: item.image || "/book-product.png",
          bookCount: item.bookCount,
        }))
      : fallbackSeries;

  const visibleSingleBooks = publishedStandaloneBooks.map((book) => ({
    id: book._id,
    title: book.title,
    description: book.description,
    imageSrc: book.coverImage || "/book-product.png",
    href: `/books/standalone/${book._id}`,
  }));

  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <PageHero />

      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle black="سلاسل" pink="الكتب" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-6 xl:grid-cols-2">
            {visibleSeries.map((item) => (
              <SeriesCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-x-hidden overflow-y-visible px-4 py-20 sm:px-6 lg:py-28">
        <SingleBooksBackground />
        <GirlBooksDecoration />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionTitle black="كتبنا" pink="المنفصلة" />

          {visibleSingleBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-36 pt-16 md:grid-cols-2 md:pt-10 lg:gap-y-28 lg:pt-32 xl:grid-cols-4">
              {visibleSingleBooks.map((book) => (
                <ProductCard key={book.id} title={book.title} description={book.description} button="شراء الكتاب" imageSrc={book.imageSrc} kind="book" showBookCount={false} href={book.href} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-dashed border-[#c5e0b2] bg-white/70 px-6 py-8 text-center text-base font-bold leading-8 text-[#525252]">
              لا توجد كتب منفصلة منشورة حتى الآن.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
