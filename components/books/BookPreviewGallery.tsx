"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const fallbackPreviews = Array.from({ length: 4 }, (_, index) => ({
  id: String(index + 1),
  src: "/inner_book.png",
}));

function PreviewImage({ src, priority = false, className = "" }: { src: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt="معاينة من داخل الكتاب"
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 52vw, 860px"
        className="object-contain object-center"
        priority={priority}
      />
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
  label,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#141219] shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:bg-[#fdeef5] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <span className="text-4xl leading-none">{direction === "prev" ? "‹" : "›"}</span>
    </button>
  );
}

export default function BookPreviewGallery({ images }: { images?: string[] }) {
  const previews = useMemo(
    () =>
      images && images.length > 0
        ? images.map((src, index) => ({ id: `${index}-${src}`, src }))
        : fallbackPreviews,
    [images]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    direction: "rtl",
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activePreview, setActivePreview] = useState<number | null>(null);

  const updateCarouselState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const modalPrev = useCallback(() => {
    setActivePreview((current) => {
      if (current === null) return current;
      return (current - 1 + previews.length) % previews.length;
    });
  }, [previews.length]);

  const modalNext = useCallback(() => {
    setActivePreview((current) => {
      if (current === null) return current;
      return (current + 1) % previews.length;
    });
  }, [previews.length]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = window.requestAnimationFrame(updateCarouselState);
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  useEffect(() => {
    if (activePreview === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePreview(null);
      if (event.key === "ArrowRight") modalNext();
      if (event.key === "ArrowLeft") modalPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePreview, modalNext, modalPrev]);

  return (
    <>
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-[#eef8e8] to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-[#eef8e8] to-transparent lg:block" />

        <div className="mb-7 flex items-center justify-center gap-3">
          <ArrowButton direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} label="السابق" />
          <ArrowButton direction="next" onClick={scrollNext} disabled={!canScrollNext} label="التالي" />
        </div>

        <div ref={emblaRef} className="overflow-hidden px-1 py-4">
          <div className="flex touch-pan-y">
            {previews.map((preview, index) => {
              const isSelected = selectedIndex === index;

              return (
                <div key={preview.id} className="min-w-0 flex-[0_0_88%] px-3 sm:flex-[0_0_60%] lg:flex-[0_0_38%] xl:flex-[0_0_32%]">
                  <button
                    type="button"
                    onClick={() => setActivePreview(index)}
                    className={`group relative block h-[230px] w-full overflow-hidden rounded-[26px] bg-white/55 p-3 shadow-[0_18px_44px_rgba(0,0,0,0.16)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 sm:h-[270px] ${
                      isSelected ? "scale-100 opacity-100" : "scale-[0.92] opacity-70"
                    }`}
                    aria-label={`فتح معاينة ${index + 1}`}
                  >
                    <div className="absolute inset-x-10 bottom-5 h-8 rounded-full bg-black/12 blur-xl" />
                    <PreviewImage src={preview.src} priority={index === 0} />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#c2187a] text-2xl text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                      +
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {previews.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition ${selectedIndex === index ? "w-8 bg-[#c2187a]" : "w-2.5 bg-[#c5e0b2]"}`}
              aria-label={`اذهب إلى المعاينة ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {activePreview !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]/90 px-4 py-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePreview(null)}
        >
          <button
            type="button"
            onClick={() => setActivePreview(null)}
            className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl font-bold text-[#141219] shadow-lg transition hover:bg-[#fdeef5]"
            aria-label="إغلاق المعاينة"
          >
            ×
          </button>

          <ArrowButton direction="prev" onClick={modalPrev} label="الصورة السابقة" className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 sm:grid" />

          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-5" onClick={(event) => event.stopPropagation()}>
            <div className="relative flex h-[min(76vh,720px)] w-full items-center justify-center rounded-[30px] bg-white/8 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
              <PreviewImage src={previews[activePreview].src} priority className="drop-shadow-[0_18px_35px_rgba(0,0,0,0.35)]" />
            </div>

            <div className="flex max-w-full items-center justify-center gap-3 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {previews.map((preview, index) => (
                <button
                  key={preview.id}
                  type="button"
                  onClick={() => setActivePreview(index)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white/10 p-1 ring-2 transition sm:h-20 sm:w-32 ${
                    activePreview === index ? "ring-[#c2187a]" : "ring-white/20 hover:ring-white/60"
                  }`}
                  aria-label={`عرض المعاينة ${index + 1}`}
                >
                  <PreviewImage src={preview.src} />
                </button>
              ))}
            </div>
          </div>

          <ArrowButton direction="next" onClick={modalNext} label="الصورة التالية" className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:grid" />
        </div>
      ) : null}
    </>
  );
}
