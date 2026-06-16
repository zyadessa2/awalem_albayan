import Link from "next/link";
import { Almarai } from "next/font/google";
import ProductCard from "./ProductCard";
import { getPublishedCourses } from "@/lib/data/content";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

const courses = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  title: "دورة نور البيان 2026",
  description: "تعلم مع سلسلة نور البيان لبناء مهارات الأطفال في القراءة والتعلم.",
}));

function OrangeStroke() {
  return (
    <svg
      className="mt-2 h-[17.233px] w-[253px] max-w-full"
      xmlns="http://www.w3.org/2000/svg"
      width="249"
      height="18"
      viewBox="0 0 249 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.87091 0.311192L3.23512 2.03868C2.77574 2.17949 2.38241 2.48097 2.12707 2.88797L0.305804 5.7909C-0.134782 6.49316 -0.0964468 7.39442 0.40218 8.05673L1.92285 10.0766C2.3007 10.5785 2.89242 10.8736 3.52065 10.8736H11.4125C11.7702 10.8736 12.1213 10.9696 12.4293 11.1514L16.4388 13.5184C16.962 13.8272 17.5972 13.8815 18.1652 13.6659L25.1801 11.0038C25.4068 10.9177 25.6472 10.8736 25.8897 10.8736H38.7433C38.9708 10.8736 39.1966 10.9125 39.4111 10.9884L47.3622 13.8047C47.7345 13.9366 48.1375 13.9553 48.5205 13.8584L59.8747 10.9858C60.1663 10.912 60.4709 10.9049 60.7656 10.9652L75.453 13.9665C75.5848 13.9934 75.7189 14.007 75.8534 14.007H87.7305C87.9328 14.007 88.134 14.0377 88.3271 14.098L97.4462 16.948C97.8462 17.0731 98.2754 17.0693 98.6731 16.9372L107.19 14.1089C107.394 14.0414 107.606 14.0065 107.82 14.0086C109.689 14.0265 113.095 14.1995 113.984 14.7903C114.884 15.3878 124.433 12.7096 129.75 11.101C130.233 10.9551 130.75 10.9955 131.203 11.2147L136.115 13.5868C136.664 13.8523 137.305 13.8523 137.854 13.5868L142.67 11.261C143.18 11.0144 143.771 10.9961 144.296 11.2106L150.775 13.8583C151.015 13.9565 151.272 14.007 151.531 14.007H166.211C166.384 14.007 166.556 13.9844 166.724 13.9399L178.014 10.9407C178.182 10.8962 178.354 10.8736 178.528 10.8736H193.207C193.466 10.8736 193.723 10.9241 193.964 11.0223L200.399 13.6525C200.949 13.8771 201.57 13.8459 202.094 13.5673L206.112 11.4327C206.76 11.0883 207.545 11.1267 208.157 11.5329L211.05 13.4542C211.574 13.8022 212.231 13.8834 212.824 13.6734L220.116 11.0903C220.514 10.9495 220.946 10.9379 221.35 11.0573L230.639 13.7991C231.094 13.9333 231.581 13.9016 232.015 13.7097L238.034 11.0449C238.289 10.932 238.564 10.8736 238.843 10.8736H247.078C248.628 10.8736 249.196 8.83409 247.869 8.03294L247.793 7.98725C246.947 7.47625 246.839 6.29095 247.579 5.6355C248.455 4.86024 248.114 3.4222 246.984 3.12195L244.036 2.33883C243.832 2.28461 243.621 2.26305 243.41 2.27497L216.941 3.77105C216.351 3.8044 215.776 3.57518 215.371 3.14489L213.936 1.62012C213.403 1.0531 212.589 0.847311 211.85 1.09269L204.55 3.51652C203.967 3.71038 203.326 3.6248 202.814 3.28448L202.18 2.86365C201.611 2.48574 200.888 2.42438 200.264 2.70093L198.947 3.2839C198.209 3.61075 197.347 3.46171 196.761 2.90603L194.378 0.644969C193.892 0.184011 193.208 -0.00316754 192.555 0.146337L177.952 3.49058C177.089 3.68816 176.199 3.29514 175.764 2.52441L175.429 1.93096C175.009 1.18844 174.165 0.793404 173.327 0.947071L159.848 3.41649C158.984 3.57467 158.338 2.64013 158.791 1.88822C159.248 1.12911 158.586 0.188461 157.717 0.363296L141.498 3.62733C140.884 3.75098 140.247 3.57946 139.778 3.16397L137.83 1.43865C137.305 0.974196 136.576 0.818052 135.907 1.02704L128.458 3.35505C127.578 3.6301 126.624 3.26784 126.148 2.47798L125.325 1.11125C124.89 0.388724 124.048 0.0168689 123.221 0.181679L113.104 2.19741C112.906 2.2369 112.703 2.24612 112.502 2.22477L98.7195 0.760249C98.2922 0.714838 97.8616 0.808292 97.4915 1.02677L93.5089 3.37783C93.0276 3.66199 92.4493 3.73175 91.9142 3.57021L80.4484 0.108963C80.0152 -0.0218133 79.5505 -0.00181281 79.1301 0.165697L74.8556 1.86899C74.2458 2.11198 73.5556 2.04027 73.0088 1.67711L72.4791 1.32534C71.89 0.934078 71.1338 0.897048 70.5093 1.22887L69.3399 1.85016C68.9339 2.06589 68.4307 1.8758 68.2688 1.44551C68.1144 1.03554 67.6472 0.839655 67.2466 1.017L65.6961 1.70351C65.1078 1.96398 64.446 1.53325 64.446 0.889861C64.446 0.363552 63.9917 -0.0477583 63.468 0.00441407L41.3815 2.20465C41.0373 2.23895 40.69 2.18335 40.3736 2.04327L37.803 0.905119C37.485 0.764351 37.1359 0.708904 36.79 0.744246L22.6767 2.18625C22.3064 2.22409 21.9845 1.93342 21.9845 1.56111C21.9845 1.1325 21.5648 0.829668 21.1581 0.964743L18.3242 1.90578C17.8036 2.07864 17.2665 1.69108 17.2665 1.14255C17.2665 0.561072 16.6684 0.171789 16.1367 0.407199L13.3874 1.6245C12.5508 1.99487 11.5694 1.73974 11.0192 1.00887C10.5212 0.347455 9.66246 0.0685622 8.87091 0.311192Z"
        fill="#F4A62A"
      />
    </svg>
  );
}

function CoursesLink() {
  return (
    <Link
      href="/courses"
      className="group z-10 flex h-[53px] w-full max-w-[292px] items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-black"
    >
      <span className="whitespace-nowrap text-base underline underline-offset-4 transition group-hover:text-[#c2187a] sm:text-xl">
        جميع الدورات التعليمية
      </span>
      <svg className="h-6 w-16 shrink-0 sm:w-[97px]" viewBox="0 0 100 24" fill="none" aria-hidden>
        <path d="M98 12H16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M2 12L20 2V22L2 12Z" fill="currentColor" />
      </svg>
    </Link>
  );
}

function CoursesDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
      <div className="absolute left-[92px] top-[88px] -rotate-[24deg] text-[42px] font-black tracking-[2px] text-[#ececec] [text-shadow:0_0_0_#ececec]">
        ABC
      </div>
      <svg className="absolute left-[48%] top-0 h-[166px] w-[140px] -translate-x-1/2 text-[#d9d9d9]/55" viewBox="0 0 190 260" fill="none">
        <path d="M70 0 C40 55 150 72 102 130 C62 176 86 210 45 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" />
        <path d="M44 250 L22 236 M44 250 L62 229" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default async function CoursesSection() {
  const publishedCourses = await getPublishedCourses(3);
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
          imageSrc: "/course-product.png",
          href: `/courses/${course.id}`,
          courseMeta: {
            lessonsCount: 0,
            booksCount: 0,
            durationLabel: "0 ساعة",
          },
        }));

  return (
    <section className={`relative overflow-hidden bg-white px-5 pb-14 pt-20 ${almarai.className}`}>
      <CoursesDecorations />

      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col-reverse items-center justify-between gap-8 text-center [direction:ltr] sm:items-start sm:text-right lg:flex-row lg:items-start">
          <CoursesLink />

          <div className="w-full text-center [direction:rtl] sm:text-right lg:w-[789px]">
            <h2 className="text-4xl font-bold leading-normal text-[#141219] md:text-5xl">
              أهم الدورات <span className="text-[#c2187a]">التعليمية</span>
            </h2>
            <p className="mt-3 max-w-[789px] text-lg font-bold leading-[34px] text-[#525252] md:text-2xl">
              سلاسل تعليمية تسهم في بناء مهارات الطفل بثقة ومتعة.
            </p>
            <div className="flex justify-center sm:justify-start">
              <OrangeStroke />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:gap-y-14 2xl:grid-cols-3 2xl:gap-x-8">
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
      </div>
    </section>
  );
}
