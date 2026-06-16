"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Almarai } from "next/font/google";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

const links = [
  ["من نحن", "/about"],
  ["الكتب", "/books"],
  ["الدورات التعليمية", "/courses"],
  ["تواصل معنا", "/contact"],
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="fixed left-0 right-0 top-0 z-50 mt-3 flex justify-center px-3 sm:mt-4 sm:px-4 md:mt-6">
      <motion.nav
        initial={{ width: "95%" }}
        animate={{
          width: isScrolled ? "min(95%, 1120px)" : "min(95%, 1280px)",
          boxShadow: isScrolled
            ? "0 0 0 8px rgba(255,255,255,.08), 0 12px 34px rgba(0,0,0,.32)"
            : "0 0 0 8px rgba(255,255,255,.08), 0 8px 28px rgba(0,0,0,.24)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative flex max-w-7xl items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-base sm:rounded-3xl sm:px-5 sm:py-3 md:px-8 md:py-4 md:text-lg"
      >
        <Link href="/" aria-label="الرئيسية">
          <Image src="/logo2-display.png" alt="شعار عوالم البيان" width={160} height={50} className="h-auto w-28 object-contain md:w-36" />
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-2xl border border-[#e7e7e7] text-[#141219] sm:h-11 sm:w-11 md:hidden"
          aria-label="فتح القائمة"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>

        <div className={`hidden items-center gap-8 font-semibold text-gray-700 md:flex ${almarai.className}`}>
          <Link href="/" className={`rounded-lg px-8 py-2 font-bold transition ${isActive("/") ? "bg-[#c2187b] text-white hover:bg-pink-700" : "text-gray-700 hover:text-pink-600"}`}>
            الرئيسية
          </Link>
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={`rounded-lg px-2 py-2 transition hover:text-pink-600 ${isActive(href) ? "bg-[#c2187b] px-8 text-white hover:bg-pink-700 hover:text-white" : ""}`}>
              {label}
            </Link>
          ))}
        </div>

        <div className={`absolute left-4 right-4 top-[calc(100%+12px)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition-all md:hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={`flex flex-col gap-2 p-4 text-right text-base font-bold text-gray-700 ${almarai.className}`}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`rounded-2xl px-5 py-3 text-center ${isActive("/") ? "bg-[#c2187b] text-white" : "hover:bg-[#f8edf4] hover:text-[#c2187a]"}`}>
              الرئيسية
            </Link>
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} className={`rounded-2xl px-5 py-3 transition ${isActive(href) ? "bg-[#c2187b] text-center text-white" : "hover:bg-[#f8edf4] hover:text-[#c2187a]"}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
