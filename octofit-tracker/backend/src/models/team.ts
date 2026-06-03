import { Schema, model, type InferSchemaType, type Types } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    weeklyGoalHours: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export type TeamDocument = Omit<InferSchemaType<typeof teamSchema>, "members"> & {
  members: Types.ObjectId[];
};
export const TeamModel = model("Team", teamSchema);
