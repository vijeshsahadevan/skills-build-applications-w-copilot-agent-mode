import { Schema, model, type InferSchemaType, type Types } from "mongoose";

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    focusArea: {
      type: String,
      required: true,
      enum: ["cardio", "strength", "mobility", "recovery"]
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"]
    },
    recommendedFor: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export type WorkoutDocument = Omit<InferSchemaType<typeof workoutSchema>, "user"> & {
  user: Types.ObjectId;
};
export const WorkoutModel = model("Workout", workoutSchema);
