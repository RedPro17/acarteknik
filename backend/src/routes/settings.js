import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

// GET /api/settings
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json(settings);
  } catch (err) {
    console.error("GET /api/settings error:", err);
    res.status(500).json({ error: "Ayarlar alınamadı" });
  }
});

// PUT /api/settings
router.put("/", async (req, res) => {
  try {
    const updates = req.body;
    let settings = await Settings.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });
    res.status(200).json(settings);
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    res.status(500).json({ error: "Ayarlar güncellenemedi" });
  }
});

export default router;
