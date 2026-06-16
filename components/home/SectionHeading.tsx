type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "right" | "center";
};

export default function SectionHeading({ eyebrow, title, align = "right" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-right"}>
      <p className="mb-1 text-lg font-black text-[#2f2f2f]">{eyebrow}</p>
      <h2 className="relative inline-block text-4xl font-black text-[#cf1b85] md:text-5xl">
        {title}
        <span className="absolute -bottom-4 right-0 h-2 w-full rounded-full bg-[#f3a51d]" />
      </h2>
    </div>
  );
}
