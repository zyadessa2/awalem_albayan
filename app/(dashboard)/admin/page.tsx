import Link from "next/link";

const dashboardItems = [
  {
    href: "/admin/courses",
    title: "الدورات",
    description: "إضافة وتعديل الدورات التعليمية وربط الكتب المقترحة بها.",
  },
  {
    href: "/admin/lessons",
    title: "الدروس",
    description: "إضافة روابط YouTube وترتيب الدروس داخل كل دورة.",
  },
  {
    href: "/admin/book-series",
    title: "سلاسل الكتب",
    description: "إدارة مجموعات الكتب التي تظهر في صفحة السلاسل.",
  },
  {
    href: "/admin/books",
    title: "الكتب",
    description: "إضافة الكتب المستقلة أو التابعة لسلسلة أو المقترحة للدورات.",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl p-4 py-20 sm:p-6 lg:p-8">
      <header className="border-b border-[#dfe4ea] pb-5">
        <h1 className="text-2xl font-extrabold text-[#17202a]">لوحة تحكم الأدمن</h1>
        <p className="mt-2 text-sm leading-6 text-[#697586]">
          من هنا تقدر تضيف وتعدل محتوى الموقع: الدورات، الدروس، الكتب، وسلاسل الكتب.
        </p>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {dashboardItems.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-lg border border-[#dfe4ea] bg-white p-5 shadow-sm transition hover:border-[#6fb23e]">
            <h2 className="text-lg font-extrabold text-[#17202a]">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#697586]">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
