import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ProductCardProps = {
  title: string;
  description: string;
  button: string;
  imageSrc: string;
  kind?: "book" | "course";
  showBookCount?: boolean;
  href?: string;
  courseMeta?: {
    lessonsCount: number;
    booksCount: number;
    durationLabel: string;
  };
};

function BookCountIcon({ className = "h-[19px] w-[19px]" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 19 19" fill="none" aria-hidden>
      <path d="M5.7395 5.54175C5.7395 5.38428 5.80206 5.23325 5.91341 5.1219C6.02476 5.01055 6.17578 4.948 6.33325 4.948H12.6666C12.8241 4.948 12.9751 5.01055 13.0864 5.1219C13.1978 5.23325 13.2603 5.38428 13.2603 5.54175C13.2603 5.69922 13.1978 5.85024 13.0864 5.96159C12.9751 6.07294 12.8241 6.1355 12.6666 6.1355H6.33325C6.17578 6.1355 6.02476 6.07294 5.91341 5.96159C5.80206 5.85024 5.7395 5.69922 5.7395 5.54175ZM6.33325 7.71883C6.17578 7.71883 6.02476 7.78139 5.91341 7.89274C5.80206 8.00409 5.7395 8.15511 5.7395 8.31258C5.7395 8.47005 5.80206 8.62108 5.91341 8.73243C6.02476 8.84378 6.17578 8.90633 6.33325 8.90633H10.2916C10.4491 8.90633 10.6001 8.84378 10.7114 8.73243C10.8228 8.62108 10.8853 8.47005 10.8853 8.31258C10.8853 8.15511 10.8228 8.00409 10.7114 7.89274C10.6001 7.78139 10.4491 7.71883 10.2916 7.71883H6.33325Z" fill="#C2187A" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.87321 0.989502C6.791 0.989502 5.91779 0.989502 5.23141 1.08213C4.51891 1.17713 3.91883 1.38296 3.44225 1.85875C2.96566 2.33534 2.76141 2.93542 2.66562 3.64792C2.573 4.33429 2.573 5.2075 2.573 6.28971V12.7101C2.573 13.7923 2.573 14.6655 2.66562 15.3519C2.76062 16.0644 2.96646 16.6645 3.44225 17.1411C3.91883 17.6177 4.51891 17.8219 5.23141 17.9185C5.91779 18.0103 6.791 18.0103 7.87321 18.0103H11.127C12.2092 18.0103 13.0824 18.0103 13.7687 17.9185C14.4812 17.8219 15.0813 17.6177 15.5579 17.1411C16.0345 16.6645 16.2387 16.0644 16.3353 15.3519C16.4272 14.6655 16.4272 13.7923 16.4272 12.7101V6.28971C16.4272 5.2075 16.4272 4.33429 16.3353 3.64792C16.2387 2.93542 16.0345 2.33534 15.5579 1.85875C15.0813 1.38217 14.4812 1.17792 13.7687 1.08213C13.0824 0.989502 12.2092 0.989502 11.127 0.989502H7.87321ZM4.283 2.69871C4.50229 2.47942 4.80946 2.33692 5.39133 2.25854C5.98825 2.17859 6.7815 2.177 7.91754 2.177H11.0842C12.2202 2.177 13.0127 2.17859 13.6112 2.25854C14.1923 2.33692 14.4995 2.48021 14.7187 2.69871C14.938 2.918 15.0805 3.22517 15.1589 3.80704C15.2389 4.40396 15.2405 5.19721 15.2405 6.33325V12.0728H6.16083C5.51325 12.0728 5.0715 12.0728 4.69229 12.1742C4.35911 12.2643 4.04391 12.411 3.7605 12.608V6.33325C3.7605 5.19721 3.76208 4.40396 3.84204 3.80625C3.92041 3.22517 4.0645 2.918 4.283 2.69871ZM3.78187 14.447C3.79375 14.7273 3.81275 14.9735 3.84204 15.1936C3.92041 15.7747 4.06371 16.0818 4.28221 16.3011C4.5015 16.5204 4.80866 16.6629 5.39054 16.7413C5.98746 16.8213 6.78071 16.8228 7.91675 16.8228H11.0834C12.2195 16.8228 13.0119 16.8213 13.6104 16.7413C14.1915 16.6629 14.4987 16.5196 14.718 16.3011C14.9372 16.0818 15.0797 15.7747 15.1581 15.1928C15.2238 14.7059 15.2365 14.0884 15.2389 13.2603H6.25266C5.47841 13.2603 5.20766 13.2651 4.99946 13.3213C4.72043 13.3961 4.46379 13.5377 4.25167 13.7338C4.03956 13.93 3.87832 14.1747 3.78187 14.447Z" fill="#C2187A" />
    </svg>
  );
}

function CourseCardShape() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 466 616" fill="none" aria-hidden>
      <g filter="url(#course-card-shadow)">
        <path
          d="M38 152.325C38 91.8384 104.921 52.071 165.275 56.0639C215.552 59.3902 267.416 51.0308 328.114 38.6572C377.692 28.5507 424 65.9271 424 116.525V490.666C424 545.537 370.538 582.008 317.073 569.662C265.781 557.817 215.325 555.16 148.004 569.511C93.5124 581.128 38 543.378 38 487.662V152.325Z"
          fill="white"
        />
      </g>
      <defs>
        <filter id="course-card-shadow" x="0" y="0" width="466" height="615.069" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="2" dy="3" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_973" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_265_973" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

function CourseLeaf() {
  return (
    <svg className="absolute right-[62px] top-[110px] z-[2] h-[30px] w-[112px] rotate-[4deg] sm:right-[66px] sm:top-[112px]" viewBox="0 0 128 34" fill="none" aria-hidden>
      <path d="M78.1074 8.60749C51.1112 12.774 3.74931 28.7373 0.187574 9.74567C-3.37417 -9.24592 44.6099 6.1271 71.606 1.96058C98.6022 -2.20595 123.374 9.81215 126.936 28.8037C130.498 47.7953 105.104 4.44096 78.1074 8.60749Z" fill="#C5E0B2" />
    </svg>
  );
}

function CourseMetaIcon({ type }: { type: "play" | "book" | "clock" }) {
  if (type === "play") {
    return (
      <svg className="h-[17px] w-[17px] shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="8" stroke="#C2187A" strokeWidth="2" />
        <path d="M8 6.8L13 10L8 13.2V6.8Z" fill="#C2187A" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg className="h-[17px] w-[17px] shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="8" stroke="#C2187A" strokeWidth="2" />
        <path d="M10 5.5V10.2L13 12" stroke="#C2187A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return <BookCountIcon className="h-[17px] w-[17px]" />;
}

function ProductAction({ href = "#", className, children }: { href?: string; className: string; children: ReactNode }) {
  if (href === "#") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function CourseCard({ title, description, button, imageSrc, href, courseMeta }: ProductCardProps) {
  const meta = courseMeta ?? {
    lessonsCount: 0,
    booksCount: 0,
    durationLabel: "0 ساعة",
  };

  return (
    <article className="relative mx-auto h-[615px] w-[min(100%,382px)] text-[#111] sm:h-[650px] sm:w-[min(100%,424px)] lg:h-[670px] lg:w-[min(100%,448px)]">
      <CourseCardShape />
      <CourseLeaf />

      <div className="relative z-10 flex h-full flex-col items-center px-10 pb-[76px] pt-[144px] sm:px-11 sm:pb-[82px] sm:pt-[150px] lg:px-12 lg:pb-[88px] lg:pt-[156px]">
        <div className="relative h-[154px] w-[292px] max-w-full overflow-hidden rounded-[22px] bg-neutral-100 [aspect-ratio:245/137] sm:h-[164px] sm:w-[310px] lg:h-[170px] lg:w-[322px] lg:rounded-[24px]">
          <Image src={imageSrc} alt={title} fill sizes="318px" className="object-cover object-center" />
        </div>

        <h3 className="mt-3 w-full max-w-[318px] text-right text-2xl font-extrabold leading-normal text-[#6fb23e]">{title}</h3>
        <p className="mt-3 w-full max-w-[318px] overflow-hidden text-right text-[15px] font-normal leading-6 text-[#525252] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {description}
        </p>

        <div className="mt-4 flex w-full max-w-[318px] flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-normal leading-6 text-[#525252]">
          <span className="inline-flex items-center gap-1">
            <CourseMetaIcon type="play" /> {meta.lessonsCount} فيديو
          </span>
          <span className="inline-flex items-center gap-1">
            <CourseMetaIcon type="book" /> {meta.booksCount} كتب
          </span>
          <span className="inline-flex items-center gap-1">
            <CourseMetaIcon type="clock" /> {meta.durationLabel}
          </span>
        </div>

        <ProductAction href={href} className="mt-6 flex h-12 w-[220px] max-w-full items-center justify-center rounded-xl bg-[#6dba3d] text-base font-extrabold text-white transition hover:bg-[#5ca834]">
          {button}
        </ProductAction>
      </div>
    </article>
  );
}

export default function ProductCard({ title, description, button, imageSrc, kind = "book", showBookCount = true, href, courseMeta }: ProductCardProps) {
  if (kind === "course") {
    return <CourseCard title={title} description={description} button={button} imageSrc={imageSrc} kind={kind} href={href} courseMeta={courseMeta} />;
  }

  return (
    <article className="relative mt-3 flex w-[min(100%,392px)] flex-col items-center justify-center rounded-3xl bg-white px-[11px] pb-3 pt-3 text-[#111] shadow-[0_-1px_18px_0_rgba(0,0,0,0.24)] max-md:mx-auto">
      <div className="relative mx-auto -mt-[136px] mb-3 h-[207.672px] w-[192.857px] rounded-[20px] bg-[#fef6ea]">
        <div className="absolute left-1/2 top-1/2 h-[209.83px] w-[206.144px] -translate-x-1/2 -translate-y-1/2 [aspect-ratio:56/57]">
          <Image src={imageSrc} alt={title} fill sizes="206px" className="object-contain object-center" />
        </div>
      </div>

      <h3 className="mb-2 self-stretch text-right text-2xl font-extrabold leading-normal text-[#6fb23e]">{title}</h3>
      <p className="mb-3 self-stretch overflow-hidden text-right text-base font-bold leading-[26px] text-[#525252] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
        {description}
      </p>

      {showBookCount ? (
        <div className="mb-5 flex self-stretch justify-start text-xs font-normal leading-[26px] text-[#525252]">
          <span className="inline-flex items-center gap-1">
            <BookCountIcon /> 3 كتب
          </span>
        </div>
      ) : (
        <div className="mb-5 h-[26px]" aria-hidden />
      )}

      <ProductAction href={href} className="mx-auto flex h-12 w-[248px] max-w-full items-center justify-center rounded-xl bg-[#6dba3d] text-base font-extrabold text-white transition hover:bg-[#5ca834]">
        {button}
      </ProductAction>
    </article>
  );
}
