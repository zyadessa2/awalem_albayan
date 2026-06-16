import { Almarai } from "next/font/google";
import ProductCard from "@/components/home/ProductCard";
import { getPublishedCourses } from "@/lib/data/content";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "الدورات التعليمية",
  description: "اكتشف دورات عوالم البيان التعليمية للأطفال مع دروس فيديو وكتب مقترحة تساعد على تعلم القراءة واللغة العربية بطريقة ممتعة.",
  path: "/courses",
  image: "/course-product.png",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

const courses = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: "دورة نور البيان 2026",
  description: "تعلم مع سلسلة نور البيان لبناء مهارات الأطفال في القراءة وفي التعليم",
  imageSrc: "/course-product.png",
}));

function PageHero() {
  return (
    <section className="relative mt-[102px] min-h-[324px] overflow-hidden bg-[#edf7e8] sm:mt-[116px]">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#edf7e8]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(111,178,62,0.24),transparent_34%),radial-gradient(circle_at_82%_45%,rgba(111,178,62,0.18),transparent_32%),linear-gradient(90deg,rgba(111,178,62,0.16),rgba(111,178,62,0.08))]" />
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_1px_1px,rgba(111,178,62,0.22)_1.2px,transparent_0)] [background-size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
        <div className="absolute inset-x-0 bottom-0 h-14 rotate-180 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        <div className="absolute left-[18%] top-[42%] text-5xl font-bold text-white/80">٢</div>
        <div className="absolute right-[20%] top-[30%] text-5xl font-bold text-white/80">ن</div>
        <div className="absolute right-[29%] bottom-[19%] text-5xl font-bold text-white/80">١</div>
        <div className="absolute left-[18%] bottom-[19%] h-8 w-8 rotate-45 bg-[#ffd700]" />
        <div className="absolute bottom-[8%] right-[15%] h-8 w-8 rounded-full bg-[#ffd700]" />
      </div>

      <div className="relative z-10 flex min-h-[324px] items-center justify-center px-4 text-center">
        <h1 className="font-qalbi text-[48px] font-normal leading-normal sm:text-[72px] lg:text-[96px]">
          <span className="text-[#6fb23e]">الدورات</span>{" "}
          <span className="text-[#c2187a]">التعليمية</span>
        </h1>
      </div>
    </section>
  );
}

function OrangeStroke() {
  return (
    <svg className="mt-2 h-[17.233px] w-[253px] max-w-full" width="249" height="18" viewBox="0 0 249 18" fill="none" aria-hidden>
      <path
        d="M8.87091 0.311192L3.23512 2.03868C2.77574 2.17949 2.38241 2.48097 2.12707 2.88797L0.305804 5.7909C-0.134782 6.49316 -0.0964468 7.39442 0.40218 8.05673L1.92285 10.0766C2.3007 10.5785 2.89242 10.8736 3.52065 10.8736H11.4125C11.7702 10.8736 12.1213 10.9696 12.4293 11.1514L16.4388 13.5184C16.962 13.8272 17.5972 13.8815 18.1652 13.6659L25.1801 11.0038C25.4068 10.9177 25.6472 10.8736 25.8897 10.8736H38.7433C38.9708 10.8736 39.1966 10.9125 39.4111 10.9884L47.3622 13.8047C47.7345 13.9366 48.1375 13.9553 48.5205 13.8584L59.8747 10.9858C60.1663 10.912 60.4709 10.9049 60.7656 10.9652L75.453 13.9665C75.5848 13.9934 75.7189 14.007 75.8534 14.007H87.7305C87.9328 14.007 88.134 14.0377 88.3271 14.098L97.4462 16.948C97.8462 17.0731 98.2754 17.0693 98.6731 16.9372L107.19 14.1089C107.394 14.0414 107.606 14.0065 107.82 14.0086C109.689 14.0265 113.095 14.1995 113.984 14.7903C114.884 15.3878 124.433 12.7096 129.75 11.101C130.233 10.9551 130.75 10.9955 131.203 11.2147L136.115 13.5868C136.664 13.8523 137.305 13.8523 137.854 13.5868L142.67 11.261C143.18 11.0144 143.771 10.9961 144.296 11.2106L150.775 13.8583C151.015 13.9565 151.272 14.007 151.531 14.007H166.211C166.384 14.007 166.556 13.9844 166.724 13.9399L178.014 10.9407C178.182 10.8962 178.354 10.8736 178.528 10.8736H193.207C193.466 10.8736 193.723 10.9241 193.964 11.0223L200.399 13.6525C200.949 13.8771 201.57 13.8459 202.094 13.5673L206.112 11.4327C206.76 11.0883 207.545 11.1267 208.157 11.5329L211.05 13.4542C211.574 13.8022 212.231 13.8834 212.824 13.6734L220.116 11.0903C220.514 10.9495 220.946 10.9379 221.35 11.0573L230.639 13.7991C231.094 13.9333 231.581 13.9016 232.015 13.7097L238.034 11.0449C238.289 10.932 238.564 10.8736 238.843 10.8736H247.078C248.628 10.8736 249.196 8.83409 247.869 8.03294L247.793 7.98725C246.947 7.47625 246.839 6.29095 247.579 5.6355C248.455 4.86024 248.114 3.4222 246.984 3.12195L244.036 2.33883C243.832 2.28461 243.621 2.26305 243.41 2.27497L216.941 3.77105C216.351 3.8044 215.776 3.57518 215.371 3.14489L213.936 1.62012C213.403 1.0531 212.589 0.847311 211.85 1.09269L204.55 3.51652C203.967 3.71038 203.326 3.6248 202.814 3.28448L202.18 2.86365C201.611 2.48574 200.888 2.42438 200.264 2.70093L198.947 3.2839C198.209 3.61075 197.347 3.46171 196.761 2.90603L194.378 0.644969C193.892 0.184011 193.208 -0.00316754 192.555 0.146337L177.952 3.49058C177.089 3.68816 176.199 3.29514 175.764 2.52441L175.429 1.93096C175.009 1.18844 174.165 0.793404 173.327 0.947071L159.848 3.41649C158.984 3.57467 158.338 2.64013 158.791 1.88822C159.248 1.12911 158.586 0.188461 157.717 0.363296L141.498 3.62733C140.884 3.75098 140.247 3.57946 139.778 3.16397L137.83 1.43865C137.305 0.974196 136.576 0.818052 135.907 1.02704L128.458 3.35505C127.578 3.6301 126.624 3.26784 126.148 2.47798L125.325 1.11125C124.89 0.388724 124.048 0.0168689 123.221 0.181679L113.104 2.19741C112.906 2.2369 112.703 2.24612 112.502 2.22477L98.7195 0.760249C98.2922 0.714838 97.8616 0.808292 97.4915 1.02677L93.5089 3.37783C93.0276 3.66199 92.4493 3.73175 91.9142 3.57021L80.4484 0.108963C80.0152 -0.0218133 79.5505 -0.00181281 79.1301 0.165697L74.8556 1.86899C74.2458 2.11198 73.5556 2.04027 73.0088 1.67711L72.4791 1.32534C71.89 0.934078 71.1338 0.897048 70.5093 1.22887L69.3399 1.85016C68.9339 2.06589 68.4307 1.8758 68.2688 1.44551C68.1144 1.03554 67.6472 0.839655 67.2466 1.017L65.6961 1.70351C65.1078 1.96398 64.446 1.53325 64.446 0.889861C64.446 0.363552 63.9917 -0.0477583 63.468 0.00441407L41.3815 2.20465C41.0373 2.23895 40.69 2.18335 40.3736 2.04327L37.803 0.905119C37.485 0.764351 37.1359 0.708904 36.79 0.744246L22.6767 2.18625C22.3064 2.22409 21.9845 1.93342 21.9845 1.56111C21.9845 1.1325 21.5648 0.829668 21.1581 0.964743L18.3242 1.90578C17.8036 2.07864 17.2665 1.69108 17.2665 1.14255C17.2665 0.561072 16.6684 0.171789 16.1367 0.407199L13.3874 1.6245C12.5508 1.99487 11.5694 1.73974 11.0192 1.00887C10.5212 0.347455 9.66246 0.0685622 8.87091 0.311192Z"
        fill="#F4A62A"
      />
    </svg>
  );
}

function SectionTitle() {
  return (
    <div className="relative z-10 mx-auto mb-20 max-w-7xl text-center lg:mb-24 lg:text-right">
      <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
        أهم الدورات <span className="text-[#c2187a]">التعليمية</span>
      </h2>
      <p className="mx-auto mt-2 max-w-[789px] text-lg font-bold leading-8 text-[#525252] md:text-2xl lg:mx-0">
        سلاسل تعليمية تسهم في بناء مهارات الطفل بثقة ومتعة.
      </p>
      <div className="flex justify-center lg:justify-start">
        <OrangeStroke />
      </div>
    </div>
  );
}

function GirlDecoration() {
  return (
    <div className="pointer-events-none absolute top-10 left-8 z-20 hidden h-[180px] w-[198px] rotate-[15.335deg] lg:block" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 146 141" fill="none">
        <path d="M67.9312 7.90479C82.7908 -5.73393 106.606 -1.11691 115.292 17.0866L128.287 44.3191L140.52 62.8419C150.17 77.4542 145.306 97.1913 129.971 105.646L108.175 117.663L78.0573 136.212C63.1696 145.381 43.6269 139.927 35.6389 124.374L20.2389 94.3886C18.9488 91.8765 17.3104 89.5593 15.3723 87.5053L8.21377 79.9189C-8.46519 62.2431 1.6949 33.1087 25.7485 29.6375L38.5322 27.7927C44.5082 26.9304 50.0849 24.2848 54.5332 20.202L67.9312 7.90479Z" fill="#C5E0B2" />
      </svg>
      <div className="absolute left-[42px] top-[5px] h-[138.308px] w-[116.768px] overflow-hidden rounded-b-[25px] bg-[url('/girl_books.png')] bg-no-repeat [aspect-ratio:103/122] [background-position:-107.691px_-70.198px] [background-size:180.574%_191.094%]" />
    </div>
  );
}

function CoursesDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
      <div className="absolute left-[7%] top-8 h-[132px] w-[132px] rotate-[-18deg] bg-[url('/1c8bf21d9d65aaebf8b5ca5971df992a880b0f36.png')] bg-contain bg-no-repeat opacity-20" />
      <svg className="absolute left-[33%] top-0 h-[210px] w-[210px] opacity-35" viewBox="0 0 216 120" fill="none">
        <path d="M2.50011 2.60123C38.604 0.988459 72.2129 18.7521 99.4742 49.2485C108.863 59.7519 118.108 73.6064 123.383 88.4371C125.775 95.1618 128.861 108.357 124.346 114.403C116.849 124.442 107.797 105.29 104.829 98.1709C99.463 85.3021 104.348 60.6261 114.67 53.7221C133.831 40.9065 161.662 44.7721 182.299 46.4818C190.539 47.1644 198.869 50.0793 207.017 50.2818C210.179 50.3603 202.411 55.3375 201.197 56.691C194.033 64.677 193.669 64.5162 202.434 57.5409C203.647 56.575 212.529 50.6678 212.556 49.6001C212.575 48.855 198.079 34.246 196.777 32.0044" stroke="#A7A7A7" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
      </svg>
    </div>
  );
}

export default async function CoursesPage() {
  const publishedCourses = await getPublishedCourses();
  const visibleCourses =
    publishedCourses.length > 0
      ? publishedCourses.map((course) => ({
          id: course._id,
          title: course.title,
          description: course.description,
          imageSrc: course.image || "/course-product.png",
          href: `/courses/${course._id}`,
          courseMeta: {
            lessonsCount: course.lessonCount ?? 0,
            booksCount: course.suggestedBooks?.length ?? 0,
            durationLabel: course.durationLabel ?? "0 ساعة",
          },
        }))
      : courses.map((course) => ({
          id: String(course.id),
          title: course.title,
          description: course.description,
          imageSrc: course.imageSrc,
          href: `/courses/${course.id}`,
          courseMeta: {
            lessonsCount: 0,
            booksCount: 0,
            durationLabel: "0 ساعة",
          },
        }));

  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <PageHero />

      <section className="relative isolate overflow-x-hidden overflow-y-visible px-4 pb-24 pt-20 sm:px-6 lg:pb-28 lg:pt-28">
        <GirlDecoration />
        <CoursesDecorations />
        <SectionTitle />

        <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:gap-y-14 2xl:grid-cols-3 2xl:gap-x-8">
          {visibleCourses.map((course) => (
            <ProductCard
              key={course.id}
              title={course.title}
              description={course.description}
              button="تفاصيل الدورة"
              imageSrc={course.imageSrc}
              kind="course"
              href={course.href}
              courseMeta={course.courseMeta}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
