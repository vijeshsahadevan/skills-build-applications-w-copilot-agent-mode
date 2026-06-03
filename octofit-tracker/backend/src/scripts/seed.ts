import { connectDatabase, mongoUri } from "../config/database";
import { ActivityModel } from "../models/activity";
import { LeaderboardModel } from "../models/leaderboard";
import { TeamModel } from "../models/team";
import { UserModel } from "../models/user";
import { WorkoutModel } from "../models/workout";

/** Seed the octofit_db database with test data */
async function seed() {
  try {
    await connectDatabase();
    console.log(`Connected to ${mongoUri}.`);

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({})
    ]);

    const users = await UserModel.insertMany([
      {
        name: "Ava Thompson",
        email: "ava.thompson@octofit.dev",
        fitnessLevel: "intermediate",
        totalPoints: 520
      },
      {
        name: "Liam Perez",
        email: "liam.perez@octofit.dev",
        fitnessLevel: "advanced",
        totalPoints: 780
      },
      {
        name: "Noah Carter",
        email: "noah.carter@octofit.dev",
        fitnessLevel: "beginner",
        totalPoints: 260
      }
    ]);

    const teams = await TeamModel.insertMany([
      {
        name: "Octo Sprinters",
        city: "Seattle",
        members: [users[0]._id, users[1]._id],
        weeklyGoalHours: 8
      },
      {
        name: "Harbor Lifters",
        city: "Portland",
        members: [users[2]._id],
        weeklyGoalHours: 5
      }
    ]);

    await ActivityModel.insertMany([
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: "run",
        durationMinutes: 45,
        caloriesBurned: 530,
        points: 120,
        loggedAt: new Date("2026-06-01T07:30:00.000Z")
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: "strength",
        durationMinutes: 40,
        caloriesBurned: 420,
        points: 95,
        loggedAt: new Date("2026-06-01T18:00:00.000Z")
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: "walk",
        durationMinutes: 35,
        caloriesBurned: 210,
        points: 55,
        loggedAt: new Date("2026-06-02T17:15:00.000Z")
      }
    ]);

    await LeaderboardModel.insertMany([
      {
        user: users[1]._id,
        rank: 1,
        score: 780,
        streakDays: 14
      },
      {
        user: users[0]._id,
        rank: 2,
        score: 520,
        streakDays: 9
      },
      {
        user: users[2]._id,
        rank: 3,
        score: 260,
        streakDays: 4
      }
    ]);

    await WorkoutModel.insertMany([
      {
        user: users[0]._id,
        title: "Midweek Core Builder",
        focusArea: "strength",
        durationMinutes: 35,
        difficulty: "intermediate",
        recommendedFor: "Users building core endurance"
      },
      {
        user: users[1]._id,
        title: "Tempo Run Intervals",
        focusArea: "cardio",
        durationMinutes: 50,
        difficulty: "advanced",
        recommendedFor: "Athletes preparing for 10K races"
      },
      {
        user: users[2]._id,
        title: "Mobility Reset",
        focusArea: "mobility",
        durationMinutes: 25,
        difficulty: "beginner",
        recommendedFor: "New members improving flexibility"
      }
    ]);

    console.log("Seed complete: users, teams, activities, leaderboard, and workouts inserted.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed", error);
    process.exit(1);
  }
}

void seed();
