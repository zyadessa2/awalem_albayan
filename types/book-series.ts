export type BookSeries = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type BookSeriesInput = Omit<BookSeries, "_id" | "createdAt" | "updatedAt">;
