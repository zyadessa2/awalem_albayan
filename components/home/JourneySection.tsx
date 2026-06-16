import Image from "next/image";

function PinkTextureBackground() {
  return (
    <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#fdf2f8]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(194,24,122,0.08),transparent_26%),radial-gradient(circle_at_82%_42%,rgba(194,24,122,0.07),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(244,166,42,0.08),transparent_32%)]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_1px_1px,rgba(194,24,122,0.16)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
      <div className="absolute inset-x-0 bottom-0 h-14 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
    </div>
  );
}

function ArrowLink() {
  return (
    <a
      href="/about"
      className="group mt-5 flex h-[53px] w-full max-w-[220px] items-center justify-center gap-2 rounded-2xl px-0 py-4 text-base font-bold text-black sm:text-lg"
    >
      <span className="whitespace-nowrap underline underline-offset-4 transition group-hover:text-[#c2187a]">تعرف علينا أكثر</span>
      <svg className="h-6 w-16 shrink-0 sm:w-[97px]" viewBox="0 0 100 24" fill="none" aria-hidden>
        <path d="M98 12H16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M2 12L20 2V22L2 12Z" fill="currentColor" />
      </svg>
    </a>
  );
}

function GirlImage() {
  return (
    <div className="relative h-[180px] w-[155px] rounded-tl-[68px] bg-[#fef6ea] shadow-[3px_4px_40px_0_rgba(0,0,0,0.18)] sm:h-[226px] sm:w-[195px] sm:rounded-tl-[86px]">
      <div className="absolute bottom-0 left-1/2 h-[238px] w-[117px] -translate-x-1/2 bg-[url('/girl.png')] bg-no-repeat [aspect-ratio:27/55] [background-position:0px_-20.353px] [background-size:100%_107.455%] sm:h-[273px] sm:w-[134px]" />
    </div>
  );
}

function BoyImage() {
  return (
    <div className="relative h-[180px] w-[155px] rounded-tl-[66px] bg-[#e2f0d8] shadow-[3px_4px_40px_0_rgba(0,0,0,0.18)] sm:h-[226px] sm:w-[195px] sm:rounded-tl-[84px]">
      <div className="absolute -bottom-4 left-1/2 h-[210px] w-[178px] -translate-x-1/2 bg-[url('/boy.png')] bg-no-repeat [aspect-ratio:96/113] [background-position:-94.751px_-89.22px] [background-size:145.47%_154.832%] sm:-bottom-5 sm:h-[246px] sm:w-[209px]" />
    </div>
  );
}

function JourneyDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
      <div className="absolute right-[126px] top-[68px] -rotate-[24deg] text-[42px] font-black tracking-[2px] text-[#d8d8d8]/70 [text-shadow:0_0_0_#d8d8d8]">
        ABC
      </div>
      <svg className="absolute bottom-[34px] left-[282px] h-[62px] w-[68px] -rotate-[17deg] text-[#f0cbdc]" viewBox="0 0 73 69" fill="none">
        <path
          d="M41.0758 24.7189C43.6869 20.1964 42.1227 14.3587 37.6001 11.7476L21.1506 2.25049L4.0567 31.8581L20.6073 41.4136C28.7297 46.103 23.9804 54.329 23.9804 54.329M23.9804 54.329L41.0758 24.7189C43.6883 20.1939 49.5246 18.6322 54.0471 21.2433L70.4966 30.7404L53.4026 60.348L36.9532 50.8508C28.7297 46.103 23.9804 54.329 23.9804 54.329ZM27.0055 59.7731C28.1358 59.0042 29.4583 58.5657 30.8241 58.507C32.19 58.4482 33.5452 58.7716 34.7374 59.4408L46.6619 66.3253M17.7531 54.4313C17.8674 53.0661 17.5919 51.6964 16.9584 50.4816C16.325 49.2669 15.3598 48.2568 14.175 47.569L2.25051 40.6844"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="absolute left-[122px] top-[100px] h-[52px] w-[52px] text-[#f4d189]" viewBox="0 0 80 80" fill="none">
        <path d="M48.2859 3.23653e-05L49.4499 8.44957C51.4414 22.9059 59.649 35.7708 71.9196 43.6692L79.0916 48.2857L70.6421 49.4497C56.1857 51.4412 43.3208 59.6488 35.4224 71.9194L30.8059 79.0914L29.6419 70.6419C27.6504 56.1855 19.4428 43.3206 7.1722 35.4222L0.000211775 30.8057L8.44975 29.6417C22.9061 27.6503 35.771 19.4426 43.6694 7.17202L48.2859 3.23653e-05Z" fill="currentColor" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

export default function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-5 md:py-[54px]">
      <PinkTextureBackground />
      <JourneyDecorations />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 items-center gap-x-4 gap-y-7 [direction:ltr] md:min-h-[406px] md:grid-cols-[195px_minmax(0,1fr)_195px] md:gap-x-8 md:gap-y-9 lg:gap-x-12">
        <div className="order-3 col-start-1 mx-auto scale-90 justify-self-start sm:scale-100 md:order-1 md:col-start-auto md:justify-self-start">
          <GirlImage />
        </div>

        <div className="order-2 col-span-2 flex flex-col items-center text-center [direction:rtl] md:order-2 md:col-span-1">
          <div className="relative h-[44px] w-[145px] sm:h-[48px] sm:w-[155px]" aria-label="عوالم البيان">
            <Image
              src="/logo2-display.png"
              alt=""
              fill
              sizes="155px"
              className="object-contain"
            />
          </div>

          <h2 className="mt-5 self-stretch font-qalbi text-[34px] font-normal leading-tight text-[#6fb23e] sm:text-[40px] md:text-5xl md:leading-normal">
            نصنع رحلة تعليمية <span className="text-[#f4a62a]">ممتعة</span> للأطفال
          </h2>

          <p className="mt-4 max-w-[760px] self-stretch font-qalbi text-xl font-normal leading-[1.55] text-[#525252] sm:text-2xl md:mt-5">
            في عوالم البيان نقدم سلاسل تعليمية وكتبا ومحتوى يساعد الأطفال على تعلم اللغة العربية والقرآن الكريم بأسلوب بسيط وممتع يناسب مراحلهم العمرية المختلفة، من خلال تجربة تعليمية تجمع بين الفهم والتدرج والمتعة لبناء أساس قوي في القراءة واللغة.
          </p>

          <ArrowLink />
        </div>

        <div className="order-1 col-start-2 mx-auto scale-90 justify-self-end sm:scale-100 md:order-3 md:col-start-auto md:translate-y-5 md:justify-self-end">
          <BoyImage />
        </div>
      </div>
    </section>
  );
}
