import Image from "next/image";
import Link from "next/link";
import { Almarai } from "next/font/google";
import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

const links = [
  ["الرئيسية", "/"],
  ["من نحن", "/about"],
  ["الدورات التعليمية", "/courses"],
  ["الكتب", "/books"],
  ["تواصل معنا", "/contact"],
];

const socialLinks = [
  {
    label: "واتساب",
    href: "https://wa.me/966501234567",
    icon: FaWhatsapp,
    color: "text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]",
  },
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/profile.php?id=61576678812015&locale=ar_AR",
    icon: FaFacebookF,
    color: "text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]",
  },
  {
    label: "يوتيوب",
    href: "https://www.youtube.com/@Nooralbayaneg",
    icon: FaYoutube,
    color: "text-[#FF0000] hover:border-[#FF0000] hover:bg-[#FF0000]",
  },
  {
    label: "تيك توك",
    href: "https://www.tiktok.com/",
    icon: FaTiktok,
    color: "text-[#161616] hover:border-[#161616] hover:bg-[#161616]",
  },
];

function FooterBackground() {
  return (
    <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#eef8e8]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(111,178,62,0.1),transparent_28%),radial-gradient(circle_at_82%_42%,rgba(111,178,62,0.09),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(244,166,42,0.06),transparent_32%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(111,178,62,0.16)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
      <div className="absolute inset-x-0 bottom-0 h-14 rotate-180 bg-[radial-gradient(18px_12px_at_8px_5px,#fff_98%,transparent_100%),radial-gradient(28px_18px_at_42px_10px,#fff_98%,transparent_100%),radial-gradient(20px_16px_at_76px_2px,#fff_98%,transparent_100%)] bg-repeat-x [background-size:96px_40px]" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={`relative z-10 shrink-0 overflow-hidden bg-white px-5 pb-10 pt-16 text-center ${almarai.className}`}>
      <FooterBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link href="/" aria-label="الرئيسية" className="relative mx-auto block h-[52px] w-[168px]">
          <Image src="/logo2-display.png" alt="عوالم البيان" fill sizes="168px" className="object-contain" />
        </Link>

        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-base font-bold text-[#141219]">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[#c2187a]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-4 text-sm font-bold text-[#6b7280]">
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#f4a62a]" aria-hidden />
              10th of ramadan , alsharqia , egypt
          </span>
          <span className="inline-flex items-center gap-2" dir="ltr">
            <FaPhoneAlt className="text-[#f4a62a]" aria-hidden />
            +201033768477
          </span>
          <span className="inline-flex items-center gap-2" dir="ltr">
            <FaEnvelope className="text-[#f4a62a]" aria-hidden />
            awalem@arabiclearn.com
          </span>
        </div>

        <div className="mt-7" aria-label="حساباتنا على مواقع التواصل الاجتماعي">
          <p className="text-sm font-extrabold text-[#4f5f49]">تابعنا على منصات التواصل</p>
          <div className="mt-4 flex items-center justify-center gap-3" dir="ltr">
            {socialLinks.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`تابعنا على ${label}`}
                title={label}
                className={`group inline-flex size-11 items-center justify-center rounded-full border border-[#d7e8cc] bg-white/85 text-lg shadow-[0_5px_18px_rgba(67,104,42,0.1)] transition duration-300 hover:-translate-y-1 hover:text-white hover:shadow-[0_8px_22px_rgba(67,104,42,0.18)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6fb23e] ${color}`}
              >
                <Icon className="transition-transform duration-300 group-hover:scale-110" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 border-t border-[#d7e8cc] pt-6">
          <div className="flex flex-col-reverse items-center justify-between gap-4 text-xs font-bold text-[#7a7f78] md:flex-row">
            <p>© 2026 منصة تعلم العربية. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="transition hover:text-[#6fb23e]">
                سياسة الخصوصية
              </Link>
              <span className="text-[#b7c5ae]">-</span>
              <Link href="/terms" className="transition hover:text-[#6fb23e]">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
