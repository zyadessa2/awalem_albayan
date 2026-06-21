"use client";

import { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const inputClass =
  "h-14 w-full rounded-2xl border border-[#dfe8d9] bg-[#f8faf6] px-5 text-right text-sm font-bold text-[#394235] outline-none transition placeholder:font-normal placeholder:text-[#9aa394] hover:border-[#c8d9bc] focus:border-[#6fb23e] focus:bg-white focus:shadow-[0_0_0_4px_rgba(111,178,62,0.1)]";

const labelClass = "mb-2 block text-sm font-extrabold text-[#353b32]";

export default function ContactForm({ className = "" }: { className?: string }) {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSending(true);
    setMessage("");
    setIsSuccess(false);

    const formData = new FormData(formElement);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || "تعذر إرسال الرسالة.");
      }

      formElement.reset();
      setIsSuccess(true);
      setMessage("تم إرسال الرسالة بنجاح.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر إرسال الرسالة.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form data-reveal="right" onSubmit={handleSubmit} className={`flex w-full flex-col rounded-[30px] bg-white p-5 sm:p-8 lg:p-10 ${className}`}>
      <div className="mb-7">
        <p className="text-sm font-extrabold text-[#6fb23e]">أرسل رسالتك</p>
        <h2 className="mt-2 text-3xl font-extrabold leading-normal text-[#171a16] sm:text-4xl">
          كيف يمكننا <span className="text-[#c2187a]">مساعدتك؟</span>
        </h2>
        <p className="mt-2 text-sm font-bold leading-7 text-[#70766c]">املأ البيانات التالية وسنتواصل معك في أقرب وقت ممكن.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>الاسم بالكامل</span>
          <input name="name" className={inputClass} type="text" placeholder="أدخل اسمك بالكامل" autoComplete="name" required minLength={2} />
        </label>
        <label>
          <span className={labelClass}>رقم الهاتف</span>
          <input name="phone" className={inputClass} type="tel" placeholder="رقم الهاتف" autoComplete="tel" dir="rtl" required minLength={5} />
        </label>
      </div>

      <label className="mt-5">
        <span className={labelClass}>البريد الإلكتروني</span>
        <input name="email" className={inputClass} type="email" placeholder="بريدك الإلكتروني" autoComplete="email" required />
      </label>

      <label className="mt-5">
        <span className={labelClass}>رسالتك</span>
        <textarea
          name="message"
          className="h-[165px] w-full resize-none rounded-2xl border border-[#dfe8d9] bg-[#f8faf6] px-5 py-4 text-right text-sm font-bold text-[#394235] outline-none transition placeholder:font-normal placeholder:text-[#9aa394] hover:border-[#c8d9bc] focus:border-[#6fb23e] focus:bg-white focus:shadow-[0_0_0_4px_rgba(111,178,62,0.1)]"
          placeholder="اكتب رسالتك أو استفسارك هنا..."
          required
          minLength={5}
        />
      </label>

      <button type="submit" disabled={isSending} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#6fb23e] text-base font-extrabold text-white shadow-[0_10px_24px_rgba(111,178,62,0.24)] transition hover:-translate-y-0.5 hover:bg-[#61a234] hover:shadow-[0_14px_28px_rgba(111,178,62,0.3)] disabled:cursor-not-allowed disabled:opacity-60">
        {isSending ? (
          "جاري الإرسال..."
        ) : (
          <>
            <FaPaperPlane className="-rotate-45 text-sm" aria-hidden />
            <span>إرسال الرسالة</span>
          </>
        )}
      </button>
      {message ? (
        <p aria-live="polite" className={`mt-4 rounded-xl px-4 py-3 text-center text-sm font-bold ${isSuccess ? "bg-[#eef8e8] text-[#44751f]" : "bg-[#fdeef5] text-[#a91568]"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
