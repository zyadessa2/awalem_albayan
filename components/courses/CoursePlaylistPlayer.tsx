"use client";

import { useMemo, useState } from "react";
import { FaLock, FaPlay } from "react-icons/fa";
import { FiClock, FiPlayCircle } from "react-icons/fi";
import type { PublicLesson } from "@/lib/data/content";

type PlayerLesson = {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
  youtubeVideoId: string;
};

function LessonItem({
  lesson,
  index,
  selected,
  onSelect,
}: {
  lesson: PlayerLesson;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => !lesson.locked && onSelect(index)}
      disabled={lesson.locked}
      className={`group grid w-full grid-cols-[44px_minmax(0,1fr)_32px] items-center gap-3 rounded-2xl border p-3 text-right transition ${
        selected
          ? "border-[#c2187a] bg-[#c2187a] text-white shadow-[0_12px_24px_rgba(194,24,122,0.22)]"
          : "border-[#e7e9ee] bg-white text-[#141219] hover:border-[#c5e0b2] hover:bg-[#fbfdf9]"
      } ${lesson.locked ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-extrabold ${
          selected ? "bg-white text-[#c2187a]" : "bg-[#eef8e8] text-[#44751f]"
        }`}
      >
        {index + 1}
      </span>

      <span className="min-w-0">
        <span className={`block truncate text-sm font-extrabold ${selected ? "text-white" : "text-[#141219]"}`}>
          {lesson.title}
        </span>
        <span className={`mt-1 flex items-center gap-1 text-xs font-bold ${selected ? "text-white/80" : "text-[#697586]"}`}>
          <FiClock className="shrink-0" />
          {lesson.duration || `الدرس ${index + 1}`}
        </span>
      </span>

      <span
        className={`grid h-8 w-8 place-items-center rounded-full ${
          selected ? "border border-white text-white" : "bg-[#fdeef5] text-[#c2187a]"
        }`}
      >
        {lesson.locked ? <FaLock className="text-xs" /> : selected ? <FaPlay className="text-[10px]" /> : <FiPlayCircle className="text-xl" />}
      </span>
    </button>
  );
}

export default function CoursePlaylistPlayer({ lessons }: { lessons?: PublicLesson[]; youtubePlaylistUrl?: string }) {
  const playerLessons = useMemo<PlayerLesson[]>(
    () =>
      (lessons ?? []).map((lesson, index) => ({
        id: lesson._id,
        title: lesson.title,
        duration: lesson.duration || `الدرس ${index + 1}`,
        locked: lesson.isLocked,
        youtubeVideoId: lesson.youtubeVideoId,
      })),
    [lessons]
  );

  const firstPlayableIndex = Math.max(
    0,
    playerLessons.findIndex((lesson) => !lesson.locked && lesson.youtubeVideoId)
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const selectedByIdIndex = selectedLessonId
    ? playerLessons.findIndex((lesson) => lesson.id === selectedLessonId)
    : -1;
  const selectedIndex = selectedByIdIndex >= 0 ? selectedByIdIndex : firstPlayableIndex;

  const selectedLesson = playerLessons[selectedIndex];
  const embedUrl =
    selectedLesson && !selectedLesson.locked && selectedLesson.youtubeVideoId
      ? `https://www.youtube.com/embed/${selectedLesson.youtubeVideoId}?rel=0&modestbranding=1`
      : "";

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:py-20">
      <aside className="order-2 rounded-[24px] border border-[#edf0f3] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.10)] lg:order-1">
        <div className="mb-4 flex items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-lg font-extrabold text-[#141219]">دروس الدورة</h2>
            <p className="mt-1 text-xs font-bold text-[#697586]">{playerLessons.length} درس</p>
          </div>
          <span className="rounded-full bg-[#eef8e8] px-3 py-1 text-xs font-extrabold text-[#44751f]">
            YouTube
          </span>
        </div>

        {playerLessons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d9dee8] bg-[#f8fafc] p-5 text-center text-sm font-bold leading-7 text-[#697586]">
            لا توجد دروس منشورة لهذه الدورة حتى الآن.
          </div>
        ) : (
          <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto pl-2">
            {playerLessons.map((lesson, index) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={index}
                selected={selectedIndex === index}
                onSelect={(index) => setSelectedLessonId(playerLessons[index]?.id ?? null)}
              />
            ))}
          </div>
        )}
      </aside>

      <div className="order-1 lg:order-2">
        <div className="relative mx-auto max-w-[860px] overflow-hidden rounded-[28px] bg-[#123943] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
          <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#111]">
            {embedUrl ? (
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={selectedLesson?.title || "درس الدورة"}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[#111] px-5 text-center">
                <div>
                  <FiPlayCircle className="mx-auto text-5xl text-[#c5e0b2]" />
                  <p className="mt-3 text-base font-extrabold text-white">اختر درسًا متاحًا لعرض الفيديو</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
