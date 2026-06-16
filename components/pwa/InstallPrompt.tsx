"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

function isStandalone() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as NavigatorWithStandalone).standalone)
  );
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(max-width: 768px)").matches ||
    /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
  );
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }

    if (!isMobileDevice() || isStandalone() || window.localStorage.getItem("awalim-install-dismissed") === "true") {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const fallbackTimer = window.setTimeout(() => {
      if (!isStandalone()) {
        setShowFallback(true);
        setIsVisible(true);
      }
    }, 1800);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  async function handleInstall() {
    if (!installEvent) return;

    await installEvent.prompt();
    const choice = await installEvent.userChoice;

    if (choice.outcome === "accepted") {
      window.localStorage.setItem("awalim-install-dismissed", "true");
      setIsVisible(false);
    }
  }

  function dismiss() {
    window.localStorage.setItem("awalim-install-dismissed", "true");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-4 z-[120] mx-auto max-w-sm rounded-2xl border border-[#dfe8d6] bg-white p-4 text-right shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/awalim-icon-192.png" alt="" className="h-12 w-12 shrink-0 rounded-xl border border-[#eef0ec]" />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold text-[#141219]">ثبت عوالم البيان على هاتفك</h2>
          <p className="mt-1 text-sm font-bold leading-6 text-[#525252]">
            {installEvent
              ? "يمكنك إضافة الموقع كتطبيق سريع على الشاشة الرئيسية."
              : "افتح قائمة المتصفح ثم اختر إضافة إلى الشاشة الرئيسية."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {installEvent ? (
          <button type="button" onClick={() => void handleInstall()} className="h-10 flex-1 rounded-xl bg-[#6fb23e] text-sm font-extrabold text-white transition hover:bg-[#61a234]">
            تثبيت
          </button>
        ) : showFallback ? (
          <span className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#eef8e8] px-3 text-xs font-extrabold text-[#44751f]">
            من قائمة المتصفح
          </span>
        ) : null}
        <button type="button" onClick={dismiss} className="h-10 rounded-xl border border-[#d9dee8] px-4 text-sm font-extrabold text-[#525252]">
          لاحقا
        </button>
      </div>
    </div>
  );
}
