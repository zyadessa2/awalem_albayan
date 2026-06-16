import AdminResourcePage from "@/components/admin/AdminResourcePage";
import { getAdminBooks } from "@/lib/data/content";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const books = await getAdminBooks();

  return (
    <AdminResourcePage
      title="إدارة الدورات"
      description="أضف بيانات الدورة، صورة العرض، والكتب المقترحة لها. الدروس تضاف من صفحة الدروس وتربط بالدورة."
      endpoint="/api/courses"
      emptyText="لا توجد دورات حتى الآن."
      fields={[
        { name: "title", label: "اسم الدورة", type: "text", required: true },
        {
          name: "slug",
          label: "الرابط المختصر",
          type: "text",
          placeholder: "يترك فارغا للتوليد التلقائي",
        },
        { name: "description", label: "وصف الدورة", type: "textarea" },
        {
          name: "image",
          label: "رابط صورة الدورة",
          type: "text",
          placeholder: "/course-product.png",
          upload: true,
        },
        {
          name: "suggestedBooks",
          label: "كتب مقترحة للدورة",
          type: "multiselect",
          options: books.map((book) => ({ label: book.title, value: book._id })),
        },
        { name: "order", label: "الترتيب", type: "number" },
        { name: "isPublished", label: "نشر الدورة", type: "checkbox" },
      ]}
    />
  );
}
