import Image from "next/image";
import { Almarai } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

function HeroArrow() {
  return (
    <svg
      className="h-[111.952px] w-[211.158px] flex-none -rotate-[1.423deg] max-lg:hidden"
      xmlns="http://www.w3.org/2000/svg"
      width="216"
      height="120"
      viewBox="0 0 216 120"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.50011 2.60123C38.604 0.988459 72.2129 18.7521 99.4742 49.2485C108.863 59.7519 118.108 73.6064 123.383 88.4371C125.775 95.1618 128.861 108.357 124.346 114.403C116.849 124.442 107.797 105.29 104.829 98.1709C99.463 85.3021 104.348 60.6261 114.67 53.7221C133.831 40.9065 161.662 44.7721 182.299 46.4818C190.539 47.1644 198.869 50.0793 207.017 50.2818C210.179 50.3603 202.411 55.3375 201.197 56.691C194.033 64.677 193.669 64.5162 202.434 57.5409C203.647 56.575 212.529 50.6678 212.556 49.6001C212.575 48.855 198.079 34.246 196.777 32.0044"
        stroke="#3F3F3F"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="10 10"
      />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="73"
      height="69"
      viewBox="0 0 73 69"
      fill="none"
      aria-hidden
    >
      <path
        d="M41.0758 24.7189C43.6869 20.1964 42.1227 14.3587 37.6001 11.7476L21.1506 2.25049L4.0567 31.8581L20.6073 41.4136C28.7297 46.103 23.9804 54.329 23.9804 54.329M23.9804 54.329L41.0758 24.7189C43.6883 20.1939 49.5246 18.6322 54.0471 21.2433L70.4966 30.7404L53.4026 60.348L36.9532 50.8508C28.7297 46.103 23.9804 54.329 23.9804 54.329ZM27.0055 59.7731C28.1358 59.0042 29.4583 58.5657 30.8241 58.507C32.19 58.4482 33.5452 58.7716 34.7374 59.4408L46.6619 66.3253M17.7531 54.4313C17.8674 53.0661 17.5919 51.6964 16.9584 50.4816C16.325 49.2669 15.3598 48.2568 14.175 47.569L2.25051 40.6844"
        stroke="#E2F0D8"
        strokeWidth="4.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative z-40 min-h-[630px] overflow-hidden bg-white pt-[78px] max-lg:min-h-0 max-lg:pt-[94px]">
      <div
        className="absolute inset-x-0 top-0 h-full w-full bg-[url('/hero-back.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden
      />

      <div className="relative z-[5] mx-auto grid min-h-[470px] w-[min(100%,1328px)] grid-cols-1 items-center gap-5 px-[18px] pb-12 pt-8 [direction:ltr] lg:min-h-[552px] lg:grid-cols-[minmax(0,1fr)_minmax(460px,625px)] lg:gap-[46px] lg:px-6 lg:pb-11 lg:pt-[34px]">
        <div className="w-[min(100%,625px)] justify-self-center text-center [direction:rtl] lg:col-start-2 lg:justify-self-end lg:text-right">
          <div className="relative mx-auto mb-2.5 h-[99.4px] w-[min(100%,320px)] max-w-full shrink-0 overflow-hidden [aspect-ratio:177/55] md:h-[127.708px] md:w-[411px] lg:mx-0">
            <Image
              src="/logo2-display.png"
              alt="عوالم البيان"
              width={411}
              height={128}
              className="h-full w-full object-contain object-right max-lg:object-center"
              fetchPriority="high"
            />
          </div>

          <h1 className="mb-3.5 w-[min(100%,625px)] text-center font-qalbi text-[38px] font-normal leading-normal text-[#6fb23e] md:text-5xl lg:text-right">
            <span>هنا تنبض الحروف و</span>
            <span className="mx-2 text-[#f4a62a]">تولد</span>
            <span>المعرفة</span>
          </h1>

          <div className={`relative mt-0.5 inline-block text-center text-[19px] font-bold leading-normal text-black md:text-2xl lg:text-right ${almarai.className}`}>
            <p>
              منظومة تعليمية <span className="text-[#c2187a]">كاملة</span> لبناء مهارات الطفل
            </p>
            <Image
              src="/stroke-orange-hero.png"
              alt=""
              width={248}
              height={11}
              className="absolute -bottom-[18px] left-0 h-[11px] w-[248px]"
            />
          </div>

          <div className="mt-[52px] flex items-center justify-center gap-[22px] [direction:ltr] lg:mt-[72px] lg:justify-start">
            <HeroArrow />
            <a
              href="https://wa.me/966501234567"
              className={`flex h-[62px] w-[min(100%,310px)] items-center justify-center gap-2 rounded-3xl bg-[#6fb23e] px-0 py-4 text-xl font-bold leading-normal text-white transition hover:-translate-y-px hover:bg-[#61a234] lg:h-[72px] lg:w-[374px] lg:text-2xl ${almarai.className}`}
            >
              <FaWhatsapp aria-hidden />
              <span>تواصل معنا</span>
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[360px] items-center justify-center md:min-h-[460px] lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-[545px]">
          <BookIcon className="pointer-events-none absolute left-[5%] top-[8%] z-[1] h-[66.129px] w-[54.972px] -rotate-[36.337deg] max-sm:scale-75" />
          <BookIcon className="pointer-events-none absolute right-[2%] top-[34%] z-[1] h-[46.889px] w-[56.98px] rotate-[14deg] max-sm:scale-75" />
          <BookIcon className="pointer-events-none absolute bottom-[18%] left-[1%] z-[1] h-[46.889px] w-[56.98px] -rotate-12 max-sm:scale-75" />

          <div className="relative h-[300px] w-full max-w-[700px] md:h-[300px] lg:h-[505px] lg:max-w-[700px]">
            <Image
              src="/kids-hero2.png"
              alt="أطفال يحملون كتب عوالم البيان"
              fill
              sizes="(max-width: 768px) 96vw, (max-width: 1024px) 56vw, 760px"
              className="z-[2] object-contain object-bottom drop-shadow-[0_22px_24px_rgba(255,255,255,0.95)]"
              fetchPriority="high"
            />
            <div className="absolute bottom-5 right-[6%] z-[1] h-14 w-[78%] rounded-full bg-white/90 blur-2xl" aria-hidden />
            <div className="absolute bottom-0 left-1/2 z-[3] h-20 w-[88%] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
