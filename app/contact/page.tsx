import Image from "next/image";
import { Almarai } from "next/font/google";
import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import ContactForm from "@/components/contact/ContactForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "تواصل معنا",
  description: "تواصل مع عوالم البيان للاستفسار عن الكتب والدورات التعليمية وسلاسل نور البيان للأطفال.",
  path: "/contact",
  image: "/contact_photo.png",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

const contacts = [
  { icon: FaWhatsapp, label: "واتساب", text: "201033768477", href: "https://wa.me/201033768477", dir: "ltr" },
  { icon: FaEnvelope, label: "الموقع الإلكتروني", text: "Awalimalbayan.com", href: "https://www.awalimalbayan.com", dir: "ltr" },
  { icon: FaMapMarkerAlt, label: "العنوان", text: "جمهورية مصر العربية - الشرقية - العاشر من رمضان", dir: "rtl" },
];

const socialLinks = [
  { label: "واتساب", href: "https://wa.me/+201033768477", icon: FaWhatsapp, hoverClass: "hover:bg-[#25D366]" },
  { label: "فيسبوك", href: "https://www.facebook.com/profile.php?id=61576678812015&locale=ar_AR", icon: FaFacebookF, hoverClass: "hover:bg-[#1877F2]" },
  { label: "يوتيوب", href: "https://www.youtube.com/@Nooralbayaneg", icon: FaYoutube, hoverClass: "hover:bg-[#FF0000]" },
  { label: "تيك توك", href: "https://www.tiktok.com/", icon: FaTiktok, hoverClass: "hover:bg-[#161616]" },
];

function PageHero() {
  return (
    <section className="relative mt-[88px] overflow-hidden bg-[#eef7e8] px-4 pb-24 pt-16 sm:mt-[104px] sm:px-6 sm:pb-28 lg:pt-20">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -right-24 -top-32 size-[390px] rounded-full bg-[#6fb23e]/15 blur-2xl" />
        <div className="absolute -bottom-48 left-[12%] size-[430px] rounded-full bg-[#f4a62a]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_1px_1px,rgba(111,178,62,0.18)_1.2px,transparent_0)] [background-size:26px_26px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div data-reveal="right" className="text-center lg:text-right">
          <span className="inline-flex items-center rounded-full border border-[#cfe4c0] bg-white/80 px-5 py-2 text-sm font-extrabold text-[#5b9f2d] shadow-sm">
            نحن أقرب إليك
          </span>
          <h1 className="mt-5 font-qalbi text-[58px] font-normal leading-[1.15] sm:text-[76px] lg:text-[88px]">
            <span className="text-[#6fb23e]">تواصل</span> <span className="text-[#c2187a]">معنا</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-9 text-[#4f574b] lg:mx-0 lg:text-xl">
            يسعدنا تواصلكم معنا لأي استفسار حول عوالم البيان وسلاسلنا التعليمية، وفريقنا جاهز دائمًا لمساعدتكم.
          </p>
        </div>

        <div data-reveal="left" data-reveal-delay="0.08" className="relative mx-auto hidden h-[290px] w-full max-w-[500px] lg:block">
          <div className="absolute -inset-3 rotate-3 rounded-[40px] border-2 border-dashed border-[#9dc77e]" aria-hidden />
          <div className="relative h-full overflow-hidden rounded-[36px] bg-[#dceccf] shadow-[0_24px_55px_rgba(58,92,34,0.2)]">
            <Image src="/contact_photo.png" alt="فريق عوالم البيان جاهز للتواصل معكم" fill priority sizes="500px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#315f1c]/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard() {
  return (
    <aside data-reveal="left" className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#6fb23e] to-[#4c9024] px-6 py-8 text-white sm:px-8 lg:rounded-[32px] lg:p-10">
      <div className="absolute -left-20 -top-20 size-64 rounded-full border-[38px] border-white/10" aria-hidden />
      <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[#f4a62a]/25 blur-xl" aria-hidden />

      <div className="relative z-10">
        <p className="text-sm font-extrabold text-white/75">بيانات التواصل</p>
        <h2 className="mt-2 text-3xl font-extrabold leading-normal">دعنا نبدأ الحديث</h2>
        <p className="mt-3 max-w-md text-sm font-bold leading-7 text-white/80">
          اختر وسيلة التواصل المناسبة لك وسنكون سعداء بالرد على استفسارك.
        </p>

        <div className="mt-8 space-y-3">
          {contacts.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-[#5da42f] shadow-[0_8px_18px_rgba(37,77,17,0.18)]">
                  <Icon aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-white/65">{item.label}</span>
                  <span className="mt-0.5 block text-sm font-extrabold leading-6 sm:text-[15px]" dir={item.dir}>
                    {item.text}
                  </span>
                </span>
              </>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 transition hover:bg-white/16">
                {content}
              </a>
            ) : (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-t border-white/20 pt-6">
          <p className="mb-4 text-sm font-extrabold">تابعنا على منصات التواصل</p>
          <div className="flex items-center gap-3" role="group" aria-label="حسابات عوالم البيان على مواقع التواصل" dir="ltr">
            {socialLinks.map(({ label, href, icon: Icon, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`تابعنا على ${label}`}
                title={label}
                className={`grid size-11 place-items-center rounded-full border border-white/25 bg-white/15 text-lg text-white transition duration-300 hover:-translate-y-1 hover:border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${hoverClass}`}
              >
                <Icon aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function ContactPage() {
  return (
    <main className={`min-h-screen overflow-x-hidden bg-[#fbfcfa] ${almarai.className}`}>
      <PageHero />

      <section className="relative z-20 -mt-14 px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-3 rounded-[38px] border border-[#e6eee0] bg-white p-3 shadow-[0_24px_65px_rgba(52,79,34,0.14)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 lg:p-5">
          <ContactInfoCard />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
