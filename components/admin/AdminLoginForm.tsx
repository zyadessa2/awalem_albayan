"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    queueMicrotask(async () => {
      try {
        const response = await fetch("/api/auth/setup", { cache: "no-store" });
        const json = await response.json();
        setNeedsSetup(Boolean(json.data?.needsSetup));
      } catch {
        setMessage("تعذر فحص حالة الإعداد.");
      } finally {
        setIsChecking(false);
      }
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(needsSetup ? "/api/auth/setup" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || "تعذر تسجيل الدخول.");
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر تسجيل الدخول.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10">
      <form onSubmit={handleSubmit} className="mx-auto mt-16 w-full max-w-md rounded-lg border border-[#dfe4ea] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#17202a]">
          {needsSetup ? "إعداد أول أدمن" : "تسجيل دخول الأدمن"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#697586]">
          {needsSetup
            ? "أنشئ حساب الأدمن الأول لإدارة محتوى الموقع."
            : "ادخل بيانات حساب الأدمن للمتابعة إلى لوحة التحكم."}
        </p>

        <div className="mt-6 grid gap-4">
          {needsSetup ? (
            <label className="text-sm font-bold text-[#17202a]">
              الاسم
              <input
                className="mt-2 w-full rounded-lg border border-[#d9dee8] px-3 py-2 text-sm outline-none focus:border-[#6fb23e] focus:ring-2 focus:ring-[#6fb23e]/15"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>
          ) : null}

          <label className="text-sm font-bold text-[#17202a]">
            البريد الإلكتروني
            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-[#d9dee8] px-3 py-2 text-sm outline-none focus:border-[#6fb23e] focus:ring-2 focus:ring-[#6fb23e]/15"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>

          <label className="text-sm font-bold text-[#17202a]">
            كلمة المرور
            <input
              type="password"
              className="mt-2 w-full rounded-lg border border-[#d9dee8] px-3 py-2 text-sm outline-none focus:border-[#6fb23e] focus:ring-2 focus:ring-[#6fb23e]/15"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
              minLength={needsSetup ? 8 : 1}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isChecking || isSubmitting}
          className="mt-6 h-11 w-full rounded-lg bg-[#6fb23e] text-sm font-extrabold text-white transition hover:bg-[#5ca834] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "جاري..." : needsSetup ? "إنشاء الأدمن" : "دخول"}
        </button>

        {message ? <p className="mt-4 rounded-lg bg-[#fdeef5] px-3 py-2 text-sm font-bold text-[#a91568]">{message}</p> : null}
      </form>
    </div>
  );
}
