import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  arrivalDate: Date,
  pickupPlace: String,
  message: String,
  country: Object,
  groupSize: Number,
  days: [
    {
      location: String,
      date: Date,
      note: String,
    },
  ],
});

export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
