import Image from "next/image";
import { Almarai } from "next/font/google";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import ContactForm from "@/components/contact/ContactForm";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
});

function PageHero() {
  return (
    <section className="relative mt-[102px] min-h-[324px] overflow-hidden bg-[#edf7e8] sm:mt-[116px]">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[#edf7e8]" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(111,178,62,0.24),transparent_34%),radial-gradient(circle_at_82%_45%,rgba(111,178,62,0.18),transparent_32%),linear-gradient(90deg,rgba(111,178,62,0.16),rgba(111,178,62,0.08))]" />
      </div>

      <div className="relative z-10 flex min-h-[324px] items-center justify-center px-4 text-center">
        <h1 className="font-qalbi text-[58px] font-normal leading-normal sm:text-[76px] lg:text-[96px]">
          <span className="text-[#6fb23e]">تواصل</span>{" "}
          <span className="text-[#c2187a]">معنا</span>
        </h1>
      </div>
    </section>
  );
}

function ContactInfoCard() {
  const contacts = [
    { icon: FaWhatsapp, text: "01062065504", dir: "ltr" },
    { icon: FaPhoneAlt, text: "01062065504", dir: "ltr" },
    { icon: FaEnvelope, text: "Awalimbayan.com", dir: "ltr" },
    { icon: FaMapMarkerAlt, text: "جمهورية مصر العربية - الشرقية - العاشر من رمضان", dir: "rtl" },
  ];

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#dceccf] shadow-[0_18px_45px_rgba(0,0,0,0.12)] lg:min-h-[430px]">
      <Image src="/contact_photo.png" alt="تواصل معنا" fill sizes="(max-width: 1024px) 100vw, 650px" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[#6fb23e]/45" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-[360px] flex-col justify-center gap-4 px-6 py-8 text-white lg:min-h-[430px] lg:px-9">
        {contacts.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={`${item.text}-${index}`} className="flex items-center gap-3 text-sm font-extrabold sm:text-base">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#6fb23e] text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                <Icon />
              </span>
              <span dir={item.dir}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className={`min-h-screen overflow-x-hidden bg-white ${almarai.className}`}>
      <PageHero />

      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto mb-14 max-w-7xl text-center lg:text-right">
          <h2 className="text-4xl font-extrabold leading-normal text-[#141219] md:text-5xl">
            تواصل <span className="text-[#c2187a]">معنا</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[789px] text-lg font-bold leading-8 text-[#525252] md:text-2xl lg:mx-0">
            يسعدنا تواصلكم معنا لأي استفسار حول عوالم البيان وسلاسلنا التعليمية.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-stretch">
          <ContactInfoCard />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
