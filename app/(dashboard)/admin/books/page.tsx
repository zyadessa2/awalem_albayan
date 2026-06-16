import AdminResourcePage from "@/components/admin/AdminResourcePage";
import {
  getAdminBookSeries,
  getAdminCourses,
} from "@/lib/data/content";

export const dynamic = "force-dynamic";

export default async function AdminBooksPage() {
  const [series, courses] = await Promise.all([
    getAdminBookSeries(),
    getAdminCourses(),
  ]);

  return (
    <AdminResourcePage
      title="إدارة الكتب"
      description="أضف الكتب المستقلة أو التابعة لسلسلة، واربطها بدورات ككتب مقترحة."
      endpoint="/api/books"
      emptyText="لا توجد كتب حتى الآن."
      fields={[
        { name: "title", label: "اسم الكتاب", type: "text", required: true },
        { name: "slug", label: "الرابط المختصر", type: "text", placeholder: "يُترك فارغًا للتوليد التلقائي" },
        { name: "description", label: "وصف الكتاب", type: "textarea" },
        { name: "coverImage", label: "رابط صورة الغلاف", type: "text", placeholder: "/book-product.png", upload: true },
        {
          name: "previewImages",
          label: "صور المعاينة",
          type: "textarea-list",
          placeholder: "اكتب كل رابط صورة في سطر مستقل",
          upload: true,
        },
        { name: "buyUrl", label: "رابط الشراء", type: "text" },
        { name: "whatsappUrl", label: "رابط واتساب", type: "text" },
        {
          name: "seriesId",
          label: "السلسلة",
          type: "select",
          options: series.map((item) => ({ label: item.title, value: item._id })),
        },
        {
          name: "suggestedForCourses",
          label: "مقترح للدورات",
          type: "multiselect",
          options: courses.map((course) => ({ label: course.title, value: course._id })),
        },
        { name: "order", label: "الترتيب", type: "number" },
        { name: "isPublished", label: "نشر الكتاب", type: "checkbox" },
      ]}
    />
  );
}
