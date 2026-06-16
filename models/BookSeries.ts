import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const bookSeriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookSeriesSchema.index({ isPublished: 1, order: 1 });

export type BookSeriesDocument = InferSchemaType<typeof bookSeriesSchema>;

const BookSeries =
  (mongoose.models.BookSeries as Model<BookSeriesDocument>) ||
  mongoose.model("BookSeries", bookSeriesSchema);

export default BookSeries;
