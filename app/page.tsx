import BooksSection from "@/components/home/BooksSection";
import ContactSection from "@/components/home/ContactSection";
import CoursesSection from "@/components/home/CoursesSection";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import JourneySection from "@/components/home/JourneySection";

export const dynamic = "force-dynamic";

function SharedHeroFeatureStar() {
  return (
    <div className="pointer-events-none relative z-50 h-0">
      <svg
        className="absolute left-10 top-[-38px] hidden h-[81px] w-[81px] rotate-[12.463deg] md:block lg:left-14"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden
      >
        <path d="M48.2859 3.23653e-05L49.4499 8.44957C51.4414 22.9059 59.649 35.7708 71.9196 43.6692L79.0916 48.2857L70.6421 49.4497C56.1857 51.4412 43.3208 59.6488 35.4224 71.9194L30.8059 79.0914L29.6419 70.6419C27.6504 56.1855 19.4428 43.3206 7.1722 35.4222L0.000211775 30.8057L8.44975 29.6417C22.9061 27.6503 35.771 19.4426 43.6694 7.17202L48.2859 3.23653e-05Z" fill="#FDEDD4" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <SharedHeroFeatureStar />
      <Features />
      <BooksSection />
      <JourneySection />
      <CoursesSection />
      <ContactSection />
    </main>
  );
}
