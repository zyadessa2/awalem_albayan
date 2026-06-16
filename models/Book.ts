import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const bookSchema = new Schema(
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
    coverImage: {
      type: String,
      default: "",
      trim: true,
    },
    previewImages: [
      {
        type: String,
        trim: true,
      },
    ],
    buyUrl: {
      type: String,
      default: "",
      trim: true,
    },
    whatsappUrl: {
      type: String,
      default: "",
      trim: true,
    },
    seriesId: {
      type: Schema.Types.ObjectId,
      ref: "BookSeries",
      default: null,
      index: true,
    },
    suggestedForCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
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

bookSchema.index({ seriesId: 1, order: 1 });
bookSchema.index({ isPublished: 1, order: 1 });

export type BookDocument = InferSchemaType<typeof bookSchema>;

const Book =
  (mongoose.models.Book as Model<BookDocument>) ||
  mongoose.model("Book", bookSchema);

export default Book;
