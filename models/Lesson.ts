import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const lessonSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeVideoId: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
      trim: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
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

lessonSchema.index({ courseId: 1, order: 1 });

export type LessonDocument = InferSchemaType<typeof lessonSchema>;

const Lesson =
  (mongoose.models.Lesson as Model<LessonDocument>) ||
  mongoose.model("Lesson", lessonSchema);

export default Lesson;
