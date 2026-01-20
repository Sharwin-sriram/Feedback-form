import mongoose from "mongoose";

export default async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected sucessfully");
  } catch (er) {
    console.log("Error Connecting to DB", er);
    process.exit(1);
  }
};
