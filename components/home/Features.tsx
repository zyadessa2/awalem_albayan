import type { IconType } from "react-icons";
import { FaBookOpen, FaBrain, FaGlobeAmericas, FaRocket } from "react-icons/fa";

type Feature = {
  title: string;
  text: string;
  colorClass: string;
  iconBackgroundClass: string;
  iconRingClass: string;
  icon: IconType;
};

const features: Feature[] = [
  {
    title: "ابتكار مستمر",
    text: "نطور مناهج ومعايير تعليمية حديثة تواكب احتياجات الطفل ومستقبل التعلم.",
    colorClass: "text-[#66a937]",
    iconBackgroundClass: "bg-[#6fb23e]",
    iconRingClass: "bg-[#e6f2dc]",
    icon: FaRocket,
  },
  {
    title: "انتشار عالمي",
    text: "موثوق بنا في ملايين البيوت في الوطن العربي والعالم الإسلامي.",
    colorClass: "text-[#ee9d18]",
    iconBackgroundClass: "bg-[#f4a62a]",
    iconRingClass: "bg-[#fff0d3]",
    icon: FaGlobeAmericas,
  },
  {
    title: "تنمية التفكير",
    text: "نركز على الفهم والتطبيق وبناء مهارات التفكير العليا.",
    colorClass: "text-[#c2187a]",
    iconBackgroundClass: "bg-[#c2187a]",
    iconRingClass: "bg-[#f8dbea]",
    icon: FaBrain,
  },
  {
    title: "مناهج متكاملة",
    text: "سلاسل ومناهج مترابطة تغطي مراحل التعلم الأولى.",
    colorClass: "text-[#66a937]",
    iconBackgroundClass: "bg-[#6fb23e]",
    iconRingClass: "bg-[#e6f2dc]",
    icon: FaBookOpen,
  },
];

function FeatureIcon({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div className={`grid size-[88px] shrink-0 place-items-center rounded-full ${feature.iconRingClass}`} aria-hidden>
      <div className={`grid size-[68px] place-items-center rounded-full text-white shadow-[0_6px_16px_rgba(45,64,34,0.16)] ${feature.iconBackgroundClass}`}>
        <Icon className="text-[32px]" />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative  px-4 py-10 sm:px-6 lg:py-12" aria-label="مميزات عوالم البيان">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex min-h-[150px] items-center gap-4 rounded-[30px] border border-white/80 bg-white px-5 py-6 text-right shadow-[0_10px_28px_rgba(45,64,34,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_34px_rgba(45,64,34,0.13)]"
          >
            <FeatureIcon feature={feature} />
            <div className="min-w-0 flex-1">
              <h2 className={`mb-2 text-xl font-extrabold leading-tight ${feature.colorClass}`}>{feature.title}</h2>
              <p className="text-[13px] font-semibold leading-6 text-[#555b52] sm:text-sm">{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
