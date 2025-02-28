import mongoose, { Schema, model, models } from "mongoose";

const CarFeedbackSchema = new Schema({
  carId: { type: String, required: true }, 
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

export const CarFeedback = models.CarFeedback || model("CarFeedback", CarFeedbackSchema);
