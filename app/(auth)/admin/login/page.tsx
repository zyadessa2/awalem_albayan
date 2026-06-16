import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "تسجيل دخول الأدمن",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
