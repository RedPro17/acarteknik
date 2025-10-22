import mongoose from "mongoose";

const QuickRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
  },
  { collection: "quick_requests" }
);

export default mongoose.models.QuickRequest || mongoose.model("QuickRequest", QuickRequestSchema);
