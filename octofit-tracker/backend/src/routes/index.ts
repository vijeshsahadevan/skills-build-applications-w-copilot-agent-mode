import { Router } from "express";
import { ActivityModel } from "../models/activity";
import { LeaderboardModel } from "../models/leaderboard";
import { TeamModel } from "../models/team";
import { UserModel } from "../models/user";
import { WorkoutModel } from "../models/workout";

const apiRouter = Router();

apiRouter.get("/users/", async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  res.json(users);
});

apiRouter.get("/teams/", async (_req, res) => {
  const teams = await TeamModel.find().populate("members", "name email fitnessLevel").lean();
  res.json(teams);
});

apiRouter.get("/activities/", async (_req, res) => {
  const activities = await ActivityModel.find()
    .populate("user", "name email")
    .populate("team", "name city")
    .sort({ loggedAt: -1 })
    .lean();
  res.json(activities);
});

apiRouter.get("/leaderboard/", async (_req, res) => {
  const leaderboard = await LeaderboardModel.find()
    .populate("user", "name fitnessLevel")
    .sort({ rank: 1 })
    .lean();
  res.json(leaderboard);
});

apiRouter.get("/workouts/", async (_req, res) => {
  const workouts = await WorkoutModel.find().populate("user", "name").sort({ createdAt: -1 }).lean();
  res.json(workouts);
});

export default apiRouter;
