import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const dynamic = "force-dynamic";

export default function AdminBookSeriesPage() {
  return (
    <AdminResourcePage
      title="إدارة سلاسل الكتب"
      description="أضف السلاسل التي تحتوي على مجموعة كتب وتظهر في صفحة الكتب."
      endpoint="/api/book-series"
      emptyText="لا توجد سلاسل كتب حتى الآن."
      fields={[
        { name: "title", label: "اسم السلسلة", type: "text", required: true },
        { name: "slug", label: "الرابط المختصر", type: "text", placeholder: "يُترك فارغًا للتوليد التلقائي" },
        { name: "description", label: "وصف السلسلة", type: "textarea" },
        { name: "image", label: "رابط صورة السلسلة", type: "text", placeholder: "/book-product.png", upload: true },
        { name: "order", label: "الترتيب", type: "number" },
        { name: "isPublished", label: "نشر السلسلة", type: "checkbox" },
      ]}
    />
  );
}
