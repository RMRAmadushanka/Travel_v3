import mongoose, { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
  packageId: { type: String, required: true }, 
  userName: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

export const Feedback = models.Feedback || model("Feedback", FeedbackSchema);
