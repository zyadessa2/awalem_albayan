import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const courseSchema = new Schema(
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
    youtubePlaylistUrl: {
      type: String,
      default: "",
      trim: true,
    },
    suggestedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
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

courseSchema.index({ isPublished: 1, order: 1 });

export type CourseDocument = InferSchemaType<typeof courseSchema>;

const Course =
  (mongoose.models.Course as Model<CourseDocument>) ||
  mongoose.model("Course", courseSchema);

export default Course;
