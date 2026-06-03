import { Schema, model, type InferSchemaType, type Types } from "mongoose";

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    rank: { type: Number, required: true, min: 1 },
    score: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export type LeaderboardDocument = Omit<InferSchemaType<typeof leaderboardSchema>, "user"> & {
  user: Types.ObjectId;
};
export const LeaderboardModel = model("Leaderboard", leaderboardSchema);
