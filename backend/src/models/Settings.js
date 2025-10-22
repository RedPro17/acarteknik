import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  siteName: String,
  logoUrl: String,
  contactEmail: String,
  phone: String,
  address: String,
  metaTitle: String,
  metaDescription: String,
  adminName: String,
  adminEmail: String,
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  smtpHost: String,
  smtpPort: Number,
  smtpUser: String,
  smtpPass: String,
  sessionTimeoutMinutes: Number,
}, { timestamps: true });

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
