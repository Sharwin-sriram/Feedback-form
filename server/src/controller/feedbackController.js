import Feedback from "../models/Feedback.js";
import { serverError } from "../Errors/serverError.js";

const message = "success";
const notFound = { message: "Feedback not found" };

export async function getAllFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (er) {
    console.log("Error in getAllFeedbacks Controller\n", er);
    serverError(req, res);
  }
}

export async function createFeedback(req, res) {
  try {
    const { name, feedback } = req.body;
    const newFeedback = new Feedback({ name, feedback });
    const save = await newFeedback.save();
    res.status(201).json({ message, save });
  } catch (er) {
    console.log("Error in createFeedback Controller\n", er);
    serverError(req, res);
  }
}

export async function getFeedbackByID(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json(notFound);
    res.status(200).json(feedback);
  } catch (er) {
    console.log("Error in getFeedbackByID controller\n", er);
    serverError(req, res);
  }
}

export async function UpdateFeedback(req, res) {
  try {
    const { name, feedback } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        name,
        feedback,
      },
      {
        new: true,
      }
    );
    if (!updated) return res.status(404).json(notFound);
    res.status(200).json({ message, updated });
  } catch (er) {
    console.log("Error in UpdateFeedback Controller", er);
    serverError(req, res);
  }
}

export async function DeleteFeedback(req, res) {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json(notFound);
    else return res.status(200).json({ message });
  } catch (er) {
    console.log("Error in DeleteFeedback Controller", er);
    serverError(req, res);
  }
}
