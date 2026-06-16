export type Book = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  previewImages: string[];
  buyUrl: string;
  whatsappUrl: string;
  seriesId: string | null;
  suggestedForCourses: string[];
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type BookInput = Omit<Book, "_id" | "createdAt" | "updatedAt">;
