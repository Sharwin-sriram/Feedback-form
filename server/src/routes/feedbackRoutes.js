import express from "express";
import {
  getAllFeedbacks,
  getFeedbackByID,
  createFeedback,
  UpdateFeedback,
  DeleteFeedback,
} from "../controller/feedbackController.js";

const router = express.Router();

router.get("/", getAllFeedbacks);
router.post("/", createFeedback);

router.get("/:id", getFeedbackByID);
router.put("/:id", UpdateFeedback);
router.delete("/:id", DeleteFeedback);

export default router;
