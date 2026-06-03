import { Schema, model, type InferSchemaType, type Types } from "mongoose";

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    type: {
      type: String,
      required: true,
      enum: ["run", "cycle", "swim", "strength", "yoga", "walk"]
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 1 },
    loggedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export type ActivityDocument = Omit<InferSchemaType<typeof activitySchema>, "user" | "team"> & {
  user: Types.ObjectId;
  team: Types.ObjectId;
};
export const ActivityModel = model("Activity", activitySchema);
