export type Lesson = {
  _id: string;
  courseId: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  duration: string;
  isLocked: boolean;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonInput = Omit<Lesson, "_id" | "youtubeVideoId" | "createdAt" | "updatedAt">;
