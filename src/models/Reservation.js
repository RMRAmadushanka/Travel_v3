// models/Reservation.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  totalGuests: { type: Number, required: true },
  totalWithDiscount: { type: Number, required: true },
  dates: { startDate: Date, endDate: Date },
  packageName: { type: String, required: true },
  totalWithoutDiscount: { type: Number, required: true },
  discount: { type: String, required: true },
  guests: { guestAdults: Number, guestChildren: Number, guestInfants: Number },
});

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default Reservation;
