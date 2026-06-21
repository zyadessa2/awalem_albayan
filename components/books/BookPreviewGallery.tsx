"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaImages, FaTimes } from "react-icons/fa";

const fallbackPreviews = Array.from({ length: 4 }, (_, index) => ({
  id: String(index + 1),
  src: "/inner_book.png",
}));

function PreviewImage({ src, priority = false, sizes = "(max-width: 768px) 90vw, 820px" }: { src: string; priority?: boolean; sizes?: string }) {
  return <Image src={src} alt="معاينة من داخل الكتاب" fill sizes={sizes} className="object-contain object-center" priority={priority} />;
}

function NavigationButton({ direction, onClick, label, dark = false }: { direction: "previous" | "next"; onClick: () => void; label: string; dark?: boolean }) {
  const Icon = direction === "previous" ? FaChevronRight : FaChevronLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-11 shrink-0 place-items-center rounded-full border text-sm shadow-sm transition hover:-translate-y-0.5 ${
        dark ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-[#dce7d5] bg-white text-[#4f713a] hover:border-[#6fb23e] hover:bg-[#f1f8ec]"
      }`}
    >
      <Icon aria-hidden />
    </button>
  );
}

export default function BookPreviewGallery({ images }: { images?: string[] }) {
  const previews = useMemo(
    () =>
      images && images.length > 0
        ? images.map((src, index) => ({ id: `${index}-${src}`, src }))
        : fallbackPreviews,
    [images],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => (current - 1 + previews.length) % previews.length);
  }, [previews.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => (current + 1) % previews.length);
  }, [previews.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowRight") showPrevious();
      if (event.key === "ArrowLeft") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, showNext, showPrevious]);

  const selectedPreview = previews[selectedIndex];

  return (
    <>
      <div data-reveal="up" className="mx-auto w-full max-w-6xl rounded-[34px] border border-[#dfe9d9] bg-white p-3 shadow-[0_22px_60px_rgba(52,78,36,0.13)] sm:p-5 lg:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#edf7e8] px-4 py-2 text-sm font-extrabold text-[#5b9f2d]">
              <FaImages aria-hidden />
              صفحات الكتاب
            </span>
            <span className="text-sm font-bold text-[#747d70]">
              {selectedIndex + 1} من {previews.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <NavigationButton direction="previous" onClick={showPrevious} label="الصورة السابقة" />
            <NavigationButton direction="next" onClick={showNext} label="الصورة التالية" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[104px_minmax(0,1fr)] lg:items-stretch">
          <div className="order-2 flex max-w-full gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-1 lg:max-h-[520px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:px-0 lg:pb-0 lg:pl-2">
            {previews.map((preview, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={preview.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`عرض صفحة المعاينة ${index + 1}`}
                  aria-current={isSelected ? "true" : undefined}
                  className={`group relative h-[76px] w-[100px] shrink-0 overflow-hidden rounded-2xl bg-[#f8faf6] p-1.5 ring-2 transition duration-200 lg:h-[96px] lg:w-full ${
                    isSelected ? "ring-[#6fb23e] shadow-[0_8px_18px_rgba(111,178,62,0.2)]" : "ring-transparent hover:ring-[#c5e0b2]"
                  }`}
                >
                  <PreviewImage src={preview.src} sizes="100px" />
                  <span className={`absolute bottom-1 left-1 grid size-5 place-items-center rounded-full text-[10px] font-black ${isSelected ? "bg-[#6fb23e] text-white" : "bg-white/90 text-[#65705f]"}`}>
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="group relative order-1 h-[330px] overflow-hidden rounded-[28px] border border-[#e5eadf] bg-[#f6f8f3] sm:h-[430px] lg:order-2 lg:h-[520px]"
            aria-label={`تكبير صفحة المعاينة ${selectedIndex + 1}`}
          >
            <div className="absolute inset-y-7 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/8 to-transparent" aria-hidden />
            <div className="absolute inset-x-[18%] bottom-5 h-9 rounded-full bg-black/10 blur-2xl" aria-hidden />
            <div className="absolute inset-4 transition duration-300 group-hover:scale-[1.015] sm:inset-6">
              <PreviewImage src={selectedPreview.src} priority />
            </div>

            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#172016]/80 px-4 py-2 text-xs font-extrabold text-white opacity-100 shadow-lg backdrop-blur-sm transition sm:opacity-0 sm:group-hover:opacity-100">
              <FaExpand aria-hidden />
              عرض بالحجم الكامل
            </span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5" aria-label="مؤشر صفحات المعاينة">
          {previews.map((preview, index) => (
            <button
              key={`dot-${preview.id}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`h-2 rounded-full transition-all ${selectedIndex === index ? "w-8 bg-[#c2187a]" : "w-2 bg-[#cbd9c2] hover:bg-[#93bc78]"}`}
              aria-label={`الانتقال إلى صفحة ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070a06]/95 px-3 py-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="معاينة الكتاب بالحجم الكامل"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button type="button" onClick={() => setIsLightboxOpen(false)} className="absolute right-4 top-4 z-30 grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-lg text-white transition hover:bg-white/20" aria-label="إغلاق المعاينة">
            <FaTimes aria-hidden />
          </button>

          <span className="absolute left-4 top-5 z-30 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-white/90">
            {selectedIndex + 1} / {previews.length}
          </span>

          <NavigationButton direction="previous" onClick={showPrevious} label="الصورة السابقة" dark />

          <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-4 px-2 sm:px-5" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[min(78vh,760px)] w-full max-w-6xl overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <PreviewImage src={selectedPreview.src} priority sizes="95vw" />
            </div>

            <div className="flex max-w-full items-center gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {previews.map((preview, index) => (
                <button
                  key={`modal-${preview.id}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10 p-1 ring-2 transition sm:h-16 sm:w-24 ${selectedIndex === index ? "ring-[#6fb23e]" : "ring-white/15 hover:ring-white/50"}`}
                  aria-label={`عرض صفحة ${index + 1}`}
                >
                  <PreviewImage src={preview.src} sizes="96px" />
                </button>
              ))}
            </div>
          </div>

          <NavigationButton direction="next" onClick={showNext} label="الصورة التالية" dark />
        </div>
      ) : null}
    </>
  );
}
