import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "pending" }, // yeni alan
}, { timestamps: true }); // createdAt, updatedAt otomatik gelir

export default mongoose.model("Request", RequestSchema);
