import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.js";
import settingsRoute from "./routes/settings.js";
import adminRoute from "./routes/admin.js";

dotenv.config();

const app = express();

// Sadece frontend localhost:3000’den gelen istekleri kabul et
app.use(cors({ origin: "http://localhost:3000" }));

// JSON body parser
app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/admin", adminRoute);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
