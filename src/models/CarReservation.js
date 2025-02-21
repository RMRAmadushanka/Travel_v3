import mongoose from "mongoose";

const carReservationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  carName: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  totalDays: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  dates: { startDate: Date, endDate: Date },
  perDayPrice: { type: Number, required: true },
});

// Prevent overwriting the model
const CarReservation =
  mongoose.models.CarReservation || mongoose.model("CarReservation", carReservationSchema);

export default CarReservation;
