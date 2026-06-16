"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "h-[50px] w-full rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] px-5 text-right text-sm font-normal text-[#525252] outline-none transition placeholder:text-[#a1a1aa] focus:border-[#6fb23e] focus:bg-white";

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
    <form onSubmit={handleSubmit} className={`flex w-full flex-col gap-4 rounded-[20px] bg-white p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)] sm:p-8 ${className}`}>
      <input name="name" className={inputClass} type="text" placeholder="أدخل اسمك بالكامل" required minLength={2} />
      <input name="phone" className={inputClass} type="tel" placeholder="رقم الهاتف" required minLength={5} />
      <input name="email" className={inputClass} type="email" placeholder="بريدك الإلكتروني" required />
      <textarea
        name="message"
        className="h-[150px] w-full resize-none rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] px-5 py-4 text-right text-sm font-normal text-[#525252] outline-none transition placeholder:text-[#a1a1aa] focus:border-[#6fb23e] focus:bg-white"
        placeholder="الرسالة..."
        required
        minLength={5}
      />
      <button type="submit" disabled={isSending} className="mt-1 flex h-[50px] w-full items-center justify-center rounded-xl bg-[#6fb23e] text-base font-extrabold text-white transition hover:bg-[#61a234] disabled:cursor-not-allowed disabled:opacity-60">
        {isSending ? "جاري الإرسال..." : "تواصل معنا"}
      </button>
      {message ? (
        <p className={`rounded-lg px-4 py-3 text-center text-sm font-bold ${isSuccess ? "bg-[#eef8e8] text-[#44751f]" : "bg-[#fdeef5] text-[#a91568]"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
