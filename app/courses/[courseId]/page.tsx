import Image from "next/image";
import Link from "next/link";
import { Almarai } from "next/font/google";
import { FaBook } from "react-icons/fa";
import { FiClock, FiPlayCircle } from "react-icons/fi";
import CoursePlaylistPlayer from "@/components/courses/CoursePlaylistPlayer";
import {
  getPublishedCourse,
  getPublishedLessonsByCourse,
  type PublicBook,
  type PublicCourse,
  type PublicLesson,
} from "@/lib/data/content";

export const dynamic = "force-dynamic";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

function PageTexture({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-[#eef8e8] ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(111,178,62,0.12),transparent_28%),radial-gradient(circle_at_82%_45%,rgba(111,178,62,0.08),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
      <div className="absolute inset-x-0 bottom-0 h-14 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/courses" className="group inline-flex items-center gap-3 text-sm font-extrabold text-[#141219] sm:text-base">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#fdeef5] transition group-hover:bg-[#f8ddec]">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 5L8 12L15 19" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="underline decoration-2 underline-offset-4">الرجوع للدورات التعليمية</span>
    </Link>
  );
}

function CourseMeta({
  lessonsCount,
  booksCount,
}: {
  lessonsCount: number;
  booksCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-normal leading-6 text-[#525252] lg:justify-start">
      <span className="inline-flex items-center gap-1">
        <FiPlayCircle className="text-[#c2187a]" /> {lessonsCount} فيديو
      </span>
      <span className="inline-flex items-center gap-1">
        <FaBook className="text-[#c2187a]" /> {booksCount} كتب
      </span>
      <span className="inline-flex items-center gap-1">
        <FiClock className="text-[#c2187a]" /> محتوى تعليمي
      </span>
    </div>
  );
}

function HeroSection({
  course,
  lessons,
}: {
  course: PublicCourse | null;
  lessons: PublicLesson[];
}) {
  const title = course?.title || "دورة نور البيان 2026";
  const description =
    course?.description ||
    "تعتمد هذه الدورة على منهجية تعليمية ومحتوى يساعد الأطفال على التعلم بأسلوب بسيط وممتع يناسب مراحلهم العمرية.";
  const image = course?.image || "/contact_photo.png";

  return (
    <section className="relative mt-[102px] overflow-hidden px-4 py-16 sm:mt-[116px] sm:px-6 lg:py-20">
      <PageTexture />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
        <div className="text-center lg:text-right">
          <div className="mb-7 flex justify-center lg:justify-start">
            <BackLink />
          </div>

          <h1 className="text-[34px] font-extrabold leading-normal text-[#141219] sm:text-[44px] lg:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-[760px] text-base font-bold leading-8 text-[#525252] sm:text-lg lg:mx-0">{description}</p>

          <div className="mt-3">
            <CourseMeta lessonsCount={lessons.length || 0} booksCount={course?.suggestedBooks?.length || 0} />
          </div>

          <a href="#course-lessons" className="mx-auto mt-5 flex h-12 w-[210px] items-center justify-center gap-2 rounded-[14px] bg-[#6fb23e] text-base font-extrabold text-white transition hover:bg-[#5ca834] lg:mx-0">
            <FiPlayCircle className="text-xl" />
            ابدأ الآن
          </a>
        </div>

        <div className="relative z-30 mx-auto h-[230px] w-full max-w-[430px] overflow-hidden rounded-[24px] bg-white shadow-[0_16px_42px_rgba(0,0,0,0.12)] lg:mx-0">
          <Image src={image} alt={title} fill sizes="430px" className="object-cover object-center" priority />
        </div>
      </div>
    </section>
  );
}

function CourseBookSection({ books }: { books: PublicBook[] }) {
  const book = books[0];

  if (!book) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:py-20">
      <PageTexture />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
        <div className="text-center lg:text-right">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            كتاب <span className="text-[#c2187a]">الدورة</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-base font-bold leading-8 text-[#525252] sm:text-xl lg:mx-0">{book.description}</p>
          <a href={book.whatsappUrl || book.buyUrl || "#"} className="mx-auto mt-6 flex h-12 w-[210px] items-center justify-center rounded-[14px] bg-[#6fb23e] text-base font-extrabold text-white transition hover:bg-[#5ca834] lg:mx-0">
            شراء الكتاب
          </a>
        </div>

        <div className="relative mx-auto h-[260px] w-[260px] lg:mx-0">
          <Image src={book.coverImage || "/book-product.png"} alt={book.title} fill sizes="320px" className="scale-110 object-contain object-center drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]" />
        </div>
      </div>
    </section>
  );
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getPublishedCourse(courseId);
  const lessons = course ? await getPublishedLessonsByCourse(course._id) : [];

  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <HeroSection course={course} lessons={lessons} />
      <div id="course-lessons">
        <CoursePlaylistPlayer lessons={lessons} youtubePlaylistUrl={course?.youtubePlaylistUrl} />
      </div>
      <CourseBookSection books={course?.suggestedBooks || []} />
    </main>
  );
}
