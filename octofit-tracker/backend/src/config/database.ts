import mongoose from "mongoose";

const defaultDatabase = "octofit_db";
const defaultUri = `mongodb://localhost:27017/${defaultDatabase}`;

export const mongoUri = process.env.MONGODB_URI || defaultUri;

export async function connectDatabase() {
  await mongoose.connect(mongoUri);
}
