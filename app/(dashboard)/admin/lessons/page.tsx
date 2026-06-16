import AdminResourcePage from "@/components/admin/AdminResourcePage";
import { getAdminCourses } from "@/lib/data/content";

export const dynamic = "force-dynamic";

export default async function AdminLessonsPage() {
  const courses = await getAdminCourses();

  return (
    <AdminResourcePage
      title="إدارة الدروس"
      description="أضف الدروس وروابط YouTube وحدد الدورة التي يظهر داخلها كل درس."
      endpoint="/api/lessons"
      emptyText="لا توجد دروس حتى الآن."
      fields={[
        {
          name: "courseId",
          label: "الدورة",
          type: "select",
          required: true,
          options: courses.map((course) => ({ label: course.title, value: course._id })),
        },
        { name: "title", label: "اسم الدرس", type: "text", required: true },
        { name: "youtubeUrl", label: "رابط فيديو YouTube", type: "text", required: true },
        { name: "duration", label: "مدة الدرس", type: "text", placeholder: "مثال: 12 دقيقة" },
        { name: "order", label: "الترتيب", type: "number" },
        { name: "isLocked", label: "درس مغلق", type: "checkbox" },
        { name: "isPublished", label: "نشر الدرس", type: "checkbox" },
      ]}
    />
  );
}
