export type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  youtubePlaylistUrl: string;
  suggestedBooks: string[];
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseInput = Omit<Course, "_id" | "createdAt" | "updatedAt">;
