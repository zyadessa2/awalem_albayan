import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center py-12 px-4 bg-white dark:bg-[#0a0a0a] font-sans" dir="rtl">
      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center mt-8">
        <div className="relative w-48 h-32 sm:w-80 sm:h-48 mb-6">
          <Image
            className="object-contain"
            src="/LOGOOOO.png"
            alt="شعار نور البيان"
            fill
            priority
          />
        </div>
        <h2 className="text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl font-medium mt-2">
          المنصة العالمية لتعليم العربية والقرآن لأبنائك
        </h2>
        <p className="text-[#dfb256] text-xs sm:text-sm tracking-widest uppercase mt-2">
          The Global Platform for Arabic & Quran Learning
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-row items-center justify-center gap-8 sm:gap-20 my-16 text-[#dfb256]">
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-bold mb-2">+10</span>
          <span className="text-zinc-400 text-xs sm:text-sm">سنوات خبرة</span>
          <span className="text-[#dfb256]/70 text-[10px] sm:text-xs uppercase tracking-wider mt-1">Years Experience</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-bold mb-2">37K</span>
          <span className="text-zinc-400 text-xs sm:text-sm">مشترك</span>
          <span className="text-[#dfb256]/70 text-[10px] sm:text-xs uppercase tracking-wider mt-1">Subscribers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-bold mb-2">30+</span>
          <span className="text-zinc-400 text-xs sm:text-sm">دولة</span>
          <span className="text-[#dfb256]/70 text-[10px] sm:text-xs uppercase tracking-wider mt-1">Countries</span>
        </div>
      </div>

      {/* Launching Soon Badge */}
      <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[#dfb256]/30 bg-transparent text-zinc-500 dark:text-zinc-300 text-sm tracking-widest mb-16">
        <span>قريباً – LAUNCHING SOON</span>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4 mb-24">
        <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#111] shadow-sm hover:shadow-md transition-shadow">
          <span className="text-4xl mb-6">🌍</span>
          <h3 className="text-[#dfb256] font-bold text-lg mb-1">للعجم والجاليات</h3>
          <p className="text-[#dfb256]/70 text-xs tracking-wider uppercase mb-4">For Non-Arabic Speakers</p>
          <p className="text-zinc-400 text-sm leading-relaxed">مخصص لأبناء الجاليات العربية والمسلمة حول العالم</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#111] shadow-sm hover:shadow-md transition-shadow">
          <span className="text-4xl mb-6">📚</span>
          <h3 className="text-[#dfb256] font-bold text-lg mb-1">منهج متكامل</h3>
          <p className="text-[#dfb256]/70 text-xs tracking-wider uppercase mb-4">Full Curriculum</p>
          <p className="text-zinc-400 text-sm leading-relaxed">منهج علمي متدرج لتعليم العربية والقرآن من الصفر</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#111] shadow-sm hover:shadow-md transition-shadow">
          <span className="text-4xl mb-6">🕌</span>
          <h3 className="text-[#dfb256] font-bold text-lg mb-1">قرآن وعربية</h3>
          <p className="text-[#dfb256]/70 text-xs tracking-wider uppercase mb-4">Quran & Arabic</p>
          <p className="text-zinc-400 text-sm leading-relaxed">تعليم القراءة والتجويد واللغة في منهج واحد</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#111] shadow-sm hover:shadow-md transition-shadow">
          <span className="text-4xl mb-6">💻</span>
          <h3 className="text-[#dfb256] font-bold text-lg mb-1">تعليم أونلاين</h3>
          <p className="text-[#dfb256]/70 text-xs tracking-wider uppercase mb-4">Online Classes</p>
          <p className="text-zinc-400 text-sm leading-relaxed">حصص مباشرة مع معلمين متخصصين عن بُعد</p>
        </div>
      </div>

      {/* Socials & Contact */}
      <div className="flex flex-col items-center w-full max-w-md px-4">
        {/* <div className="flex items-center gap-4 mb-6 text-zinc-300 w-full">
          <hr className="flex-1 border-zinc-200 dark:border-zinc-800" />
          <span className="text-[10px] uppercase tracking-widest text-[#dfb256]/50">تابعونا - Follow Us</span>
          <hr className="flex-1 border-zinc-200 dark:border-zinc-800" />
        </div>
        
        <div className="flex gap-4 mb-12">
          <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#dfb256]/30 text-[#dfb256] hover:bg-[#dfb256]/10 transition-colors">
            🎵
          </a>
          <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#dfb256]/30 text-[#dfb256] hover:bg-[#dfb256]/10 transition-colors">
            ▶️
          </a>
          <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#dfb256]/30 text-[#dfb256] hover:bg-[#dfb256]/10 transition-colors">
            📸
          </a>
          <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#dfb256]/30 text-[#dfb256] hover:bg-[#dfb256]/10 font-bold transition-colors">
            f
          </a>
        </div>

        <div className="flex items-center gap-4 mb-6 text-zinc-300 w-full">
          <hr className="flex-1 border-zinc-200 dark:border-zinc-800" />
          <span className="text-[10px] uppercase tracking-widest text-[#dfb256]/50">تواصل معنا - Contact Us</span>
          <hr className="flex-1 border-zinc-200 dark:border-zinc-800" />
        </div>
        
        <a href="#" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-emerald-200 bg-white dark:bg-[#111] text-emerald-500 hover:bg-emerald-50 dark:border-emerald-800/50 dark:hover:bg-emerald-900/20 shadow-sm transition-colors mb-8">
          <span className="text-xl">💬</span>
          <span className="font-semibold text-sm">WhatsApp | واتساب</span>
        </a> */}
        
        <div className="text-zinc-300 dark:text-zinc-600 text-xs mt-8">
          © 2026 Noor Al-Bayan - All rights reserved.
        </div>
      </div>
    </div>
  );
}
