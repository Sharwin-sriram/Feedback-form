import mongoose from "mongoose";
import crypto from "node:crypto";

const feedback_db = mongoose.connection.useDb("feedback_db");
const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { id: crypto.randomUUID }
);

export default feedback_db.model("Feedback", FeedbackSchema);
