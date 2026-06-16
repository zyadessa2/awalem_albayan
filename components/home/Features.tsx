import Image from "next/image";
import type { IconType } from "react-icons";
import { FaBookOpen, FaChartLine, FaBrain, FaSeedling } from "react-icons/fa";

type Feature = {
  title: string;
  text: string;
  colorClass: string;
  fillClass: string;
  ringClass: string;
  icon: IconType;
};

const features: Feature[] = [
  {
    title: "تعلم متدرج وفعال",
    text: "يتم التعلم عبر خطوات متدرجة تضمن الفهم والإتقان",
    colorClass: "text-[#70b543]",
    fillClass: "fill-[#70b543]",
    ringClass: "stroke-[#c5e0b2]",
    icon: FaChartLine,
  },
  {
    title: "تأسيس لغوي قوي",
    text: "تكوين بنيان التأسيس اللغوي القوي هو مفتاح النجاح الأكاديمي والحياتي",
    colorClass: "text-[#f4a51c]",
    fillClass: "fill-[#f4a51c]",
    ringClass: "stroke-[#ffd89a]",
    icon: FaSeedling,
  },
  {
    title: "تنمية التفكير والفهم",
    text: "يتم التعلم عبر خطوات متدرجة تضمن الفهم والإتقان",
    colorClass: "text-[#ce2286]",
    fillClass: "fill-[#ce2286]",
    ringClass: "stroke-[#dc70b1]",
    icon: FaBrain,
  },
  {
    title: "مناهج متكاملة",
    text: "يتم التعلم عبر خطوات متدرجة تضمن الفهم والإتقان",
    colorClass: "text-[#70b543]",
    fillClass: "fill-[#70b543]",
    ringClass: "stroke-[#c5e0b2]",
    icon: FaBookOpen,
  },
];

function WavyBadge({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div className="relative mb-5 grid h-[131px] w-[131px] place-items-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 131 131" fill="none" aria-hidden>
        <path
          className={feature.ringClass}
          d="M65.5 10.5C68.6 10.5 71.2 14.1 74.2 14.6C77.3 15.1 81 12.6 83.9 13.6C86.9 14.7 88.2 19 90.9 20.5C93.7 22.1 98.1 21.3 100.5 23.3C102.9 25.3 102.8 29.8 104.8 32.2C106.8 34.6 111.2 35.5 112.8 38.2C114.4 40.9 112.8 45.1 113.9 48.1C115 51.1 118.9 53.3 119.4 56.4C119.9 59.4 117 62.8 117 66C117 69.1 119.9 72.6 119.4 75.6C118.9 78.7 115 80.9 113.9 83.9C112.8 86.9 114.4 91.1 112.8 93.8C111.2 96.5 106.8 97.4 104.8 99.8C102.8 102.2 102.9 106.7 100.5 108.7C98.1 110.7 93.7 109.9 90.9 111.5C88.2 113 86.9 117.3 83.9 118.4C81 119.4 77.3 116.9 74.2 117.4C71.2 117.9 68.6 121.5 65.5 121.5C62.4 121.5 59.8 117.9 56.8 117.4C53.7 116.9 50 119.4 47.1 118.4C44.1 117.3 42.8 113 40.1 111.5C37.3 109.9 32.9 110.7 30.5 108.7C28.1 106.7 28.2 102.2 26.2 99.8C24.2 97.4 19.8 96.5 18.2 93.8C16.6 91.1 18.2 86.9 17.1 83.9C16 80.9 12.1 78.7 11.6 75.6C11.1 72.6 14 69.1 14 66C14 62.8 11.1 59.4 11.6 56.4C12.1 53.3 16 51.1 17.1 48.1C18.2 45.1 16.6 40.9 18.2 38.2C19.8 35.5 24.2 34.6 26.2 32.2C28.2 29.8 28.1 25.3 30.5 23.3C32.9 21.3 37.3 22.1 40.1 20.5C42.8 19 44.1 14.7 47.1 13.6C50 12.6 53.7 15.1 56.8 14.6C59.8 14.1 62.4 10.5 65.5 10.5Z"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className={feature.fillClass} cx="65.5" cy="65.5" r="42" />
      </svg>
      <Icon className="relative z-10 text-4xl text-white" aria-hidden />
    </div>
  );
}

function SunBurst() {
  return (
    <svg className="absolute bottom-8 right-14 hidden h-[68px] w-[68px] md:block" viewBox="0 0 68 68" fill="none" aria-hidden>
      <path d="M52.8363 5.68561L41.1201 26.2264L60.6542 12.8993L43.164 28.8143L65.8604 22.1758L44.3081 31.907L67.9451 32.6071L44.4406 35.202L66.7043 43.172L43.5483 38.3767L62.2595 52.8365L41.7187 41.1202L55.0458 60.6544L39.1309 43.1641L45.7693 65.8605L36.0381 44.3082L35.338 67.9452L32.7431 44.4407L24.7731 66.7044L29.5685 43.5484L15.1087 62.2597L26.8249 41.7189L7.29076 55.046L24.7811 39.131L2.08465 45.7694L23.6369 36.0382L-6.34092e-05 35.3382L23.5044 32.7433L1.2407 24.7732L24.3967 29.5686L5.68548 15.1088L26.2263 26.8251L12.8992 7.29089L28.8141 24.7812L22.1757 2.08478L31.9069 23.637L32.607 6.84363e-05L35.2019 23.5046L43.1719 1.24083L38.3765 24.3968L52.8363 5.68561Z" fill="#FFD700" fillOpacity="0.34" />
    </svg>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20">
      <SunBurst />
      <Image
        src="/83918f3e1780d001d96e386f6f38447ec00432fd.png"
        alt=""
        width={147}
        height={131}
        className="absolute bottom-[-28px] left-1/2 hidden h-[131px] w-[147px] -translate-x-1/2 rotate-[33.698deg] object-cover object-[center_center] opacity-20 lg:block"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="flex flex-col items-center">
            <WavyBadge feature={feature} />
            <h3 className={`mb-2 text-xl font-extrabold ${feature.colorClass}`}>{feature.title}</h3>
            <p className="max-w-48 text-sm font-bold leading-7 text-[#5d5d5d]">{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
