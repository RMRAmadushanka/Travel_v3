import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  arrivalDate: Date,
  pickupPlace: String,
  country: Object,
  groupSize: Number,
  days: [
    {
      date: Date,
      location: String,
    },
  ],
});

export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
