import Image from "next/image";
import { Almarai } from "next/font/google";
import { FaBookOpen, FaBrain, FaSeedling } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

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
        <h1 className="font-qalbi text-[58px] font-normal leading-normal sm:text-[76px] lg:text-[96px]">
          <span className="text-[#6fb23e]">من</span>{" "}
          <span className="text-[#c2187a]">نحن؟</span>
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
    <div className="mb-12 flex flex-col items-start text-center lg:items-right lg:text-right">
      <h2 className="text-4xl font-extrabold leading-normal text-[#6fb23e] md:text-5xl">
        نبني الأساس .... لنصنع المستقبل
      </h2>
      <p className="mt-3 max-w-[880px] text-lg font-bold leading-8 text-[#525252] md:text-2xl">
        نقدم تجربة تعليمية تساعد الأطفال على تعلم اللغة العربية والقراءة بأسلوب ممتع ومتدرج.
      </p>
      <OrangeStroke />
    </div>
  );
}

function OrganicCardShape() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 466 616" fill="none" preserveAspectRatio="none" aria-hidden>
      <g filter="url(#about-card-shadow)">
        <path d="M38 152.325C38 91.8384 104.921 52.071 165.275 56.0639C215.552 59.3902 267.416 51.0308 328.114 38.6572C377.692 28.5507 424 65.9271 424 116.525V490.666C424 545.537 370.538 582.008 317.073 569.662C265.781 557.817 215.325 555.16 148.004 569.511C93.5124 581.128 38 543.378 38 487.662V152.325Z" fill="white" />
      </g>
      <defs>
        <filter id="about-card-shadow" x="0" y="0" width="466" height="615.069" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" />
          <feColorMatrix in="SourceAlpha" type="matrix" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dx="2" dy="3" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
          <feBlend mode="normal" />
          <feBlend mode="normal" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M9 10.5C9 8.843 10.343 7.5 12 7.5H18.5C20.157 7.5 21.5 8.843 21.5 10.5V31.5C21.5 29.843 20.157 28.5 18.5 28.5H12C10.343 28.5 9 29.843 9 31.5V10.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M31 10.5C31 8.843 29.657 7.5 28 7.5H21.5V31.5C21.5 29.843 22.843 28.5 24.5 28.5H28C29.657 28.5 31 29.843 31 31.5V10.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

const cards = [
  {
    color: "bg-[#6fb23e]",
    key: "green",
    swash: "#c5e0b2",
    text: (
      <>
        نحن دار نشر <span className="text-[#6fb23e]">تعليمية</span> متخصصة في إنتاج وتطوير المناهج والسلاسل التعليمية للأطفال، بهدف بناء جيل قادر على القراءة والفهم والتفكير منذ المراحل الأولى من التعلم.
      </>
    ),
  },
  {
    color: "bg-[#c2187a]",
    key: "pink",
    swash: "#e6a0ca",
    text: (
      <>
        نقدم محتوى تعليميا يجمع بين <span className="text-[#c2187a]">الأصالة اللغوية والأساليب التربوية الحديثة</span>، مع التركيز على تأسيس الطفل تأسيسا متينا يقوده إلى الطلاقة في القراءة والفهم.
      </>
    ),
  },
  {
    color: "bg-[#f4a62a]",
    key: "orange",
    swash: "#fbd49a",
    text: (
      <>
        نعتمد على أسس تربوية حديثة تجمع بين الأصالة اللغوية والإبداع التعليمي لنقدم محتوى يساعد الطفل على التعلم <span className="text-[#f4a62a]">بثقة ومتعة.</span>
      </>
    ),
  },
];

function AboutCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <article className="relative mx-auto h-[380px] w-full max-w-[410px]">
      <OrganicCardShape />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-11 pb-14 pt-16 text-center">
        <div className="grid h-[96px] w-[96px] place-items-center rounded-full bg-[#f8fbf5] shadow-[0_8px_22px_rgba(111,178,62,0.16)]">
          <div className={`grid h-[70px] w-[70px] place-items-center rounded-full text-white ${card.color}`}>
            <BookIcon />
          </div>
        </div>
        <p className="mt-2 mb-7 text-lg font-bold leading-8 text-[#525252]">{card.text}</p>
        <svg className="absolute bottom-11 left-16 h-[34px] w-[128px] rotate-[-8deg] scale-x-[-1] scale-y-[-1]" viewBox="0 0 128 34" fill="none" aria-hidden>
          <path d="M78.1074 8.60749C51.1112 12.774 3.74931 28.7373 0.187574 9.74567C-3.37417 -9.24592 44.6099 6.1271 71.606 1.96058C98.6022 -2.20595 123.374 9.81215 126.936 28.8037C130.498 47.7953 105.104 4.44096 78.1074 8.60749Z" fill={card.swash} />
        </svg>
      </div>
    </article>
  );
}

function AboutFoundationSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
      <div className="pointer-events-none absolute left-12 top-10 hidden -rotate-[20deg] text-7xl font-black tracking-[2px] text-[#ececec] lg:block">ABC</div>
      <div className="mx-auto max-w-7xl">
        <SectionTitle />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-end">
          {cards.map((card, index) => (
            <div key={card.key} className={`relative ${index === 1 ? "lg:translate-y-10" : ""}`}>
              {index === 2 && (
                <div className="pointer-events-none absolute left-1/2 top-[-220px] z-20 hidden h-[258px] w-[163px] -translate-x-1/2 lg:block">
                  <Image src="/boy_about.png" alt="" fill sizes="163px" className="object-cover object-center" />
                </div>
              )}
              <AboutCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DigitalSolutionsLogo() {
  return (
    <div className="flex items-center justify-center gap-4 text-left">
      <div className="relative grid h-[94px] w-[108px] shrink-0 place-items-center text-[#51456c]">
        <svg className="h-full w-full" viewBox="0 0 118 100" fill="none" aria-hidden>
          <path d="M22 26H96C99.3137 26 102 28.6863 102 32V73C102 76.3137 99.3137 79 96 79H22C18.6863 79 16 76.3137 16 73V32C16 28.6863 18.6863 26 22 26Z" stroke="currentColor" strokeWidth="4" />
          <path d="M48 79H70L74 92H44L48 79Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M41 94H77" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M54 44L70 53L54 62V44Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M35 20C46 8 66 7 80 18" stroke="#c2187a" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 17L43 18L36 30" stroke="#c2187a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-[28px] font-extrabold leading-tight text-[#244b68] sm:text-[34px]">
          الحلول التعليمية
          <span className="block">الرقمية</span>
        </p>
        <p className="mt-1 text-base font-bold text-[#244b68]">Digital Learning Solutions</p>
      </div>
    </div>
  );
}

function FamousSeriesSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:py-20">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#fdf1f8]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_45%,rgba(194,24,122,0.08),transparent_30%),radial-gradient(circle_at_82%_50%,rgba(244,166,42,0.08),transparent_28%)]" />
        <div className="absolute inset-x-0 top-0 h-12 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
        <div className="absolute inset-x-0 bottom-0 h-12 rotate-180 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            أشهر سلاسلنا <span className="text-[#c2187a]">التعليمية</span>
          </h2>
          <OrangeStroke />
        </div>

        <div dir="rtl" className="grid items-center gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="flex justify-center">
            <Image
              src="/noor-elbayan.png"
              alt="نور البيان"
              width={330}
              height={170}
              className="h-auto w-[250px] object-contain sm:w-[330px]"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/logo2-display.png"
              alt="عوالم البيان"
              width={370}
              height={180}
              className="h-auto w-[270px] object-contain sm:w-[370px]"
            />
          </div>
          <div className="flex justify-center">
            <DigitalSolutionsLogo />
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderIcon({ type }: { type: "book" | "target" | "badge" }) {
  if (type === "target") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "badge") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3L14.2 6.1L18 5.5L17.4 9.3L20.5 11.5L17.4 13.7L18 17.5L14.2 16.9L12 20L9.8 16.9L6 17.5L6.6 13.7L3.5 11.5L6.6 9.3L6 5.5L9.8 6.1L12 3Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 5.5C5 4.672 5.672 4 6.5 4H11C12.105 4 13 4.895 13 6V19C13 17.895 12.105 17 11 17H6.5C5.672 17 5 17.672 5 18.5V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 5.5C19 4.672 18.328 4 17.5 4H13V19C13 17.895 13.895 17 15 17H17.5C18.328 17 19 17.672 19 18.5V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

const founderCards = [
  { title: "نور البيان", text: "مؤسس المنهج العالمي", type: "book" as const, color: "text-[#6fb23e]", bg: "bg-[#edf7e8]" },
  { title: "علمه البيان", text: "تطوير مهارات القراءة", type: "target" as const, color: "text-[#f4a62a]", bg: "bg-[#fff4df]" },
  { title: "نهج البيان", text: "رسالة قرآنية شاملة", type: "badge" as const, color: "text-[#c2187a]", bg: "bg-[#fde8f3]" },
];

const founderTimeline = [
  { year: "1963", title: "مولده في بلبيس، الشرقية" },
  { year: "", title: "تأسيس منهج نور البيان" },
  { year: "", title: "تأسيس سلسلة علمه البيان" },
  { year: "", title: "تأسيس نهج البيان" },
  { year: "", title: "تأسيس روح البيان" },
  { year: "", title: "تأسيس روضة البيان" },
  { year: "2022", title: "وفاته وتركه أثرا عظيما" },
];

function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
      <div className="pointer-events-none absolute left-[9%] top-20 hidden -rotate-[22deg] text-[#e9e9e9] lg:block" aria-hidden>
        <svg className="h-28 w-36" viewBox="0 0 120 90" fill="none">
          <path d="M14 30L58 12L104 30L58 48L14 30Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 38V56C44 69 74 69 88 56V38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M104 30V50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center text-center lg:items-start lg:text-right">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            عن <span className="text-[#c2187a]">المؤسس</span>
          </h2>
          <OrangeStroke />
        </div>

        <div className="relative overflow-hidden rounded-[34px] px-5 py-8 shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:px-8 lg:px-14 lg:py-12">
          <Image
            src="/خلفيه-المؤسس.png"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-95"
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/25" aria-hidden />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[370px_1fr] lg:items-start">
            <div className="relative mx-auto w-full max-w-[360px] lg:order-1">
              <div className="rounded-[24px] bg-[#f7c7e4] p-4 shadow-[0_12px_28px_rgba(194,24,122,0.20)]">
                <div className="relative aspect-[262/354] overflow-hidden rounded-[18px] border-4 border-white bg-[#eee]">
                  <Image src="/المؤسس.jpg" alt="الشيخ طارق السعيد" fill sizes="360px" className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-[190px] rounded-lg border-2 border-[#c2187a] bg-white/80 px-5 py-4 text-right shadow-[0_10px_25px_rgba(0,0,0,0.14)] backdrop-blur">
                <p className="text-lg font-extrabold text-[#c2187a]">المنشأ</p>
                <p className="mt-2 text-base font-bold leading-7 text-[#7a7a7a]">بلبيس، الشرقية، جمهورية مصر العربية</p>
              </div>
            </div>

            <div className="text-center lg:order-2 lg:text-right">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fde8f3] px-5 py-2 text-sm font-extrabold text-[#c2187a]">
                <FounderIcon type="target" />
                سيرة مؤسس
              </span>

              <h3 className="mt-6 text-4xl font-extrabold leading-normal text-[#c2187a] md:text-5xl">الشيخ طارق السعيد</h3>
              <p className="mt-4 text-xl font-extrabold leading-9 text-[#525252]">مؤسس منهج نور البيان وصاحب رسالة تعليمية أثرت في أجيال</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-base font-bold text-[#777] lg:justify-end">
                <span>2022 - 1963</span>
                <span className="h-5 w-px bg-[#d8d0c8]" />
                <span>بلبيس، الشرقية</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {founderCards.map((card) => (
                  <div key={card.title} className="rounded-2xl bg-white px-5 py-6 text-center shadow-[0_6px_20px_rgba(0,0,0,0.10)]">
                    <div className={`mx-auto grid h-10 w-10 place-items-center rounded-lg ${card.bg} ${card.color}`}>
                      <FounderIcon type={card.type} />
                    </div>
                    <h4 className="mt-4 text-lg font-extrabold text-[#141219]">{card.title}</h4>
                    <p className="mt-1 text-sm font-bold text-[#666]">{card.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#d41488] px-6 py-6 text-center text-xl font-extrabold leading-9 text-white shadow-[0_10px_24px_rgba(194,24,122,0.25)]">
                &quot;نريد أن نقبل على القرآن كمنهج حياة - لا سبيل لنجاة البشرية إلا به&quot;
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 px-1 pb-2">
            <div className="relative hidden h-[92px] items-start justify-between lg:flex">
              <div className="absolute left-[5%] right-[5%] top-5 h-px bg-[#eadde5]" />
              {founderTimeline.map((item, index) => (
                <div key={`${item.title}-${index}`} className="relative flex w-[13%] flex-col items-center text-center">
                  <span className={`relative z-10 grid h-6 w-6 place-items-center rounded-full border-4 border-[#f8d7e9] bg-white ${index === 0 || index === founderTimeline.length - 1 ? "border-[#c2187a]" : ""}`}>
                    <span className="h-2 w-2 rounded-full bg-[#c2187a]" />
                  </span>
                  {item.year && <span className="mt-4 text-sm font-extrabold text-[#c2187a]">{item.year}</span>}
                  <span className="mt-1 text-sm font-extrabold leading-6 text-[#525252]">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-3 lg:hidden">
              {founderTimeline.map((item, index) => (
                <div key={`${item.title}-mobile-${index}`} className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 text-right shadow-sm">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-4 border-[#f8d7e9] bg-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c2187a]" />
                  </span>
                  <p className="text-sm font-extrabold text-[#525252]">
                    {item.year && <span className="ml-2 text-[#c2187a]">{item.year}</span>}
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type StoryItem = {
  title: string;
  text: string;
  colorClass: string;
  fillClass: string;
  ringClass: string;
  icon: IconType;
  side: "right" | "left";
};

const foundationStory: StoryItem[] = [
  {
    title: "بداية السؤال",
    text: "بدأت الحكاية بسؤال بسيط، لكنه عميق: لماذا يعجز كثير من الأطفال عن القراءة بطلاقة رغم سنوات الدراسة؟",
    colorClass: "text-[#6fb23e]",
    fillClass: "fill-[#70b543]",
    ringClass: "stroke-[#c5e0b2]",
    icon: FaBookOpen,
    side: "left",
  },
  {
    title: "التجربة والبحث",
    text: "من هذا السؤال انطلقت رحلة البحث والتجربة، التي قادت إلى ظهور كتاب ومنهج نور البيان لتعليم القراءة وتنزيل القرآن.",
    colorClass: "text-[#c2187a]",
    fillClass: "fill-[#ce2286]",
    ringClass: "stroke-[#dc70b1]",
    icon: FaBrain,
    side: "right",
  },
  {
    title: "ظهور نور البيان",
    text: "ومع مرور الوقت أثبت منهج نور البيان نجاحه في تعليم آلاف الأطفال، وانتشر في العديد من المراكز التعليمية ودور التحفيظ والمدارس.",
    colorClass: "text-[#f4a62a]",
    fillClass: "fill-[#f4a51c]",
    ringClass: "stroke-[#ffd89a]",
    icon: FaSeedling,
    side: "left",
  },
  {
    title: "النجاح والانتشار",
    text: "ومن هنا جاءت فكرة إنشاء دار عوالم البيان ناشرون لتقديم منظومة تعليمية شاملة تدعم الطفل في جميع مهاراته اللغوية والمعرفية.",
    colorClass: "text-[#6fb23e]",
    fillClass: "fill-[#70b543]",
    ringClass: "stroke-[#c5e0b2]",
    icon: FaBookOpen,
    side: "right",
  },
  {
    title: "تأسيس الدار",
    text: "واليوم نواصل رحلتنا في تطوير مناهج تعليمية تسهم في إعداد جيل قارئ واع قادر على فهم لغته والتعبير بها، واكتشاف العالم من حوله بثقة ومعرفة.",
    colorClass: "text-[#c2187a]",
    fillClass: "fill-[#ce2286]",
    ringClass: "stroke-[#dc70b1]",
    icon: FaBrain,
    side: "left",
  },
];

function StoryWavyBadge({ item }: { item: StoryItem }) {
  const Icon = item.icon;

  return (
    <div className="relative grid h-[112px] w-[112px] shrink-0 place-items-center md:h-[124px] md:w-[124px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 131 131" fill="none" aria-hidden>
        <path
          className={item.ringClass}
          d="M65.5 10.5C68.6 10.5 71.2 14.1 74.2 14.6C77.3 15.1 81 12.6 83.9 13.6C86.9 14.7 88.2 19 90.9 20.5C93.7 22.1 98.1 21.3 100.5 23.3C102.9 25.3 102.8 29.8 104.8 32.2C106.8 34.6 111.2 35.5 112.8 38.2C114.4 40.9 112.8 45.1 113.9 48.1C115 51.1 118.9 53.3 119.4 56.4C119.9 59.4 117 62.8 117 66C117 69.1 119.9 72.6 119.4 75.6C118.9 78.7 115 80.9 113.9 83.9C112.8 86.9 114.4 91.1 112.8 93.8C111.2 96.5 106.8 97.4 104.8 99.8C102.8 102.2 102.9 106.7 100.5 108.7C98.1 110.7 93.7 109.9 90.9 111.5C88.2 113 86.9 117.3 83.9 118.4C81 119.4 77.3 116.9 74.2 117.4C71.2 117.9 68.6 121.5 65.5 121.5C62.4 121.5 59.8 117.9 56.8 117.4C53.7 116.9 50 119.4 47.1 118.4C44.1 117.3 42.8 113 40.1 111.5C37.3 109.9 32.9 110.7 30.5 108.7C28.1 106.7 28.2 102.2 26.2 99.8C24.2 97.4 19.8 96.5 18.2 93.8C16.6 91.1 18.2 86.9 17.1 83.9C16 80.9 12.1 78.7 11.6 75.6C11.1 72.6 14 69.1 14 66C14 62.8 11.1 59.4 11.6 56.4C12.1 53.3 16 51.1 17.1 48.1C18.2 45.1 16.6 40.9 18.2 38.2C19.8 35.5 24.2 34.6 26.2 32.2C28.2 29.8 28.1 25.3 30.5 23.3C32.9 21.3 37.3 22.1 40.1 20.5C42.8 19 44.1 14.7 47.1 13.6C50 12.6 53.7 15.1 56.8 14.6C59.8 14.1 62.4 10.5 65.5 10.5Z"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className={item.fillClass} cx="65.5" cy="65.5" r="42" />
      </svg>
      <Icon className="relative z-10 text-3xl text-white md:text-4xl" aria-hidden />
    </div>
  );
}

function DottedStoryArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`pointer-events-none hidden h-[104px] w-[110px] text-[#8f8f8f] lg:block ${flip ? "scale-x-[-1]" : ""}`}
      viewBox="0 0 110 104"
      fill="none"
      aria-hidden
    >
      <path
        d="M64.6 5.5C42.6 5.5 35.2 26.4 48.6 38.3C60.1 48.5 77.1 36.1 67.8 24.8C58.2 13.2 33.4 29.1 34.7 55.9C35.3 68.6 40.6 78.6 48.2 89.1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 9"
      />
      <path d="M28.2 83.2L49.8 92.1L51.5 68.9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 9" />
    </svg>
  );
}

function StoryRow({ item, index }: { item: StoryItem; index: number }) {
  const isRight = item.side === "right";

  return (
    <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_150px_1fr]">
      <div className={`${isRight ? "lg:col-start-3" : "lg:col-start-1"} flex items-center gap-5 ${isRight ? "justify-end text-right" : "justify-start text-right lg:flex-row-reverse lg:text-left"}`}>
        <StoryWavyBadge item={item} />
        <div className="max-w-[520px]">
          <h3 className={`text-2xl font-extrabold leading-normal md:text-[32px] ${item.colorClass}`}>{item.title}</h3>
          <p className="mt-2 text-lg font-extrabold leading-8 text-[#5b5b5b] md:text-xl">{item.text}</p>
        </div>
      </div>

      {index < foundationStory.length - 1 && (
        <div className="absolute left-1/2 top-[78%] -translate-x-1/2">
          <DottedStoryArrow flip={index % 2 === 1} />
        </div>
      )}
    </div>
  );
}

function FoundationStorySection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center lg:items-start lg:text-right">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            قصة <span className="text-[#c2187a]">التأسيس</span>
          </h2>
          <OrangeStroke />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:gap-7">
          {foundationStory.map((item, index) => (
            <StoryRow key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const impactStats = [
  { value: "+5000", label: "حضانة ومركز تعليمي" },
  { value: "في أكثر من +15", label: "دولة" },
  { value: "+1,000,000", label: "نسخة من سلسلة نور البيان" },
  { value: "+500,000", label: "طفل ومتعلم بمنهجنا" },
];

function ImpactIcon() {
  return (
    <div className="relative grid h-[98px] w-[98px] shrink-0 place-items-center">
      <svg className="absolute inset-0 h-full w-full -rotate-12" viewBox="0 0 98 98" fill="none" aria-hidden>
        <path d="M79.7 23.4C91.2 38 91.1 59.3 78.2 74.1C64.9 89.4 41.9 92.2 25.3 80.5C8.7 68.8 3.9 46.2 14.6 28.9C25.2 11.7 47.4 5.1 65.8 13.6" stroke="#C5E0B2" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="grid h-[68px] w-[68px] place-items-center rounded-full bg-white/70 text-[#6fb23e]">
        <BookIcon />
      </div>
    </div>
  );
}

function ImpactStatsSection() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-white px-4 py-14 sm:px-6 lg:py-16">
      <div className="absolute inset-y-8 left-1/2 w-screen -translate-x-1/2 bg-[#edf7e8]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(111,178,62,0.18),transparent_34%),linear-gradient(90deg,rgba(111,178,62,0.10),rgba(111,178,62,0.04))]" />
        <div className="absolute inset-x-0 top-0 h-12 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
        <div className="absolute inset-x-0 bottom-0 h-12 rotate-180 bg-[radial-gradient(22px_14px_at_10px_4px,#fff_98%,transparent_100%),radial-gradient(36px_22px_at_58px_8px,#fff_98%,transparent_100%),radial-gradient(24px_18px_at_106px_0px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:132px_42px]" />
      </div>

      <div className="pointer-events-none absolute right-[8%] top-8 hidden -rotate-[22deg] text-6xl font-black tracking-[2px] text-[#d8d8d8]/70 lg:block" aria-hidden>
        ABC
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-24 w-36 -translate-x-1/2 opacity-20 lg:block" aria-hidden>
        <svg viewBox="0 0 120 90" fill="none" className="h-full w-full text-[#d8d8d8]">
          <path d="M14 30L58 12L104 30L58 48L14 30Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 38V56C44 69 74 69 88 56V38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_520px]">
        <div className="order-2 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:order-1 lg:gap-y-10">
          {impactStats.map((stat) => (
            <div key={stat.value} className="flex items-center justify-center gap-5 text-right sm:justify-end">
              <div>
                <p className="text-2xl font-extrabold leading-normal text-[#f4a62a] md:text-[28px]">{stat.value}</p>
                <p className="mt-1 max-w-[170px] text-xl font-extrabold leading-8 text-[#3f3f3f]">{stat.label}</p>
              </div>
              <ImpactIcon />
            </div>
          ))}
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-center">
          <Image
            src="/book-product.png"
            alt="كتب نور البيان"
            width={560}
            height={500}
            className="h-auto w-[320px] max-w-full object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.16)] sm:w-[430px] lg:-my-20 lg:w-[560px]"
          />
        </div>
      </div>
    </section>
  );
}

function DecorativeArabicLetters() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-5xl font-extrabold text-[#6fb23e]/45 lg:block" aria-hidden>
      <span className="absolute left-[9%] top-[28%] rotate-[18deg]">ن</span>
      <span className="absolute left-[5%] top-[48%] rotate-[-18deg]">ب</span>
      <span className="absolute right-[31%] top-[55%] rotate-[22deg]">أ</span>
      <span className="absolute right-[17%] bottom-[17%] rotate-[-12deg]">ب</span>
      <span className="absolute right-[9%] top-[33%] rotate-[12deg]">ن</span>
    </div>
  );
}

function VisionImage({
  src,
  alt,
  blobClass,
  imageClass,
}: {
  src: string;
  alt: string;
  blobClass: string;
  imageClass: string;
}) {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[430px] sm:h-[420px]">
      <div className={`absolute inset-x-8 bottom-8 top-8 ${blobClass}`} aria-hidden />
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 430px" className={`relative z-10 object-contain ${imageClass}`} />
    </div>
  );
}

function VisionQuote({
  children,
  align = "right",
}: {
  children: ReactNode;
  align?: "right" | "left";
}) {
  return (
    <div className={`relative w-full max-w-[629px] ${align === "right" ? "text-right" : "text-right lg:text-left"}`}>
      <span className="absolute -top-8 right-0 text-6xl font-extrabold leading-none text-[#c2187a]">“</span>
      <p className="font-qalbi text-[28px] font-normal leading-[48px] text-[#3b3b3b] md:text-[32px] md:leading-[54px]">{children}</p>
      <span className={`${align === "right" ? "left-0" : "right-0 lg:left-0 lg:right-auto"} absolute -bottom-10 text-6xl font-extrabold leading-none text-[#c2187a]`}>
        ”
      </span>
    </div>
  );
}

function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
      <DecorativeArabicLetters />
      <Image
        src="/f680db94eed0fae6abedf3cc045f1894b3a0ecfe.png"
        alt=""
        width={156}
        height={150}
        className="pointer-events-none absolute left-[28%] top-[12%] hidden h-auto w-[110px] -rotate-[10deg] opacity-25 lg:block"
        aria-hidden
      />
      <div className="pointer-events-none absolute right-[30%] top-0 hidden -rotate-[22deg] text-[#e9e9e9] lg:block" aria-hidden>
        <svg className="h-28 w-36" viewBox="0 0 120 90" fill="none">
          <path d="M14 30L58 12L104 30L58 48L14 30Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 38V56C44 69 74 69 88 56V38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M104 30V50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center text-center lg:items-start lg:text-right">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            رؤيتنا <span className="text-[#c2187a]">ورسالتنا</span>
          </h2>
          <OrangeStroke />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_440px]">
          <div className="flex justify-center lg:justify-start">
            <VisionQuote>
              في <span className="text-[#c2187a]">عوالم البيان</span> نقدم سلاسل تعليمية وكتبا ومحتوى يساعد الأطفال على تعلم اللغة العربية والقرآن الكريم بأسلوب بسيط وممتع يناسب مراحلهم العمرية المختلفة، من خلال تجربة تعليمية تجمع بين الفهم والتدرج والمتعة لبناء أساس قوي في <span className="text-[#f4a62a]">القراءة واللغة.</span>
            </VisionQuote>
          </div>

          <VisionImage
            src="/بنت الرؤيه.png"
            alt="بنت تقرأ كتابا"
            blobClass="rounded-[44%_56%_40%_60%/50%_42%_58%_50%] bg-[#c5e0b2]"
            imageClass="object-bottom"
          />
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-0 lg:grid-cols-[440px_1fr]">
          <div>
            <VisionImage
              src="/ولد الرؤيه.png"
              alt="ولد يقرأ كتابا"
              blobClass="rounded-[46%_54%_55%_45%/48%_45%_55%_52%] bg-[#fde1a8] rotate-12"
              imageClass="object-bottom"
            />
          </div>

          <div className="flex justify-center lg:justify-end">
            <VisionQuote align="right">
              تعمل دار <span className="text-[#c2187a]">عوالم البيان</span> على تطوير وتقديم منظومات تعليمية متكاملة للأطفال، تساعد على بناء طفل واع ومثقف وقادر على الفهم والتفكير والتعبير، من خلال مناهج حديثة وتجارب تعليمية تجمع بين المعرفة والمتعة <span className="text-[#f4a62a]">والتطبيق العملي.</span>
            </VisionQuote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <PageHero />
      <AboutFoundationSection />
      <FamousSeriesSection />
      <FounderSection />
      <FoundationStorySection />
      <ImpactStatsSection />
      <VisionMissionSection />
    </main>
  );
}
