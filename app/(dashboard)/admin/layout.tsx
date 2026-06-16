import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "لوحة التحكم",
  path: "/admin",
  noIndex: true,
});

const navItems = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/courses", label: "الدورات" },
  { href: "/admin/lessons", label: "الدروس" },
  { href: "/admin/book-series", label: "سلاسل الكتب" },
  { href: "/admin/books", label: "الكتب" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-36 text-[#17202a] md:pt-40">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1680px] lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-[#dfe4ea] bg-white px-4 py-5 lg:border-b-0 lg:border-l">
          <Link href="/admin" className="block text-xl font-extrabold text-[#17202a]">
            لوحة التحكم
          </Link>
          <p className="mt-1 text-xs font-bold text-[#697586]">{session?.email}</p>

          <nav className="mt-5 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-[#525252] transition hover:bg-[#eef8e8] hover:text-[#17202a]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <AdminLogoutButton />
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
