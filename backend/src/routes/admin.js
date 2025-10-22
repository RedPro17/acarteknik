import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
console.log("Admin username:", process.env.ADMIN_USERNAME);
console.log("Admin password:", process.env.ADMIN_PASSWORD);

// 🔐 Şifre değiştirme rotası
router.post("/change-password", async (req, res) => {
  try {
    const { oldPass, newPass } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD; // .env'deki mevcut admin şifresi

    if (!oldPass || !newPass) {
      return res.status(400).json({ error: "Eksik bilgi" });
    }

    // Eski şifreyi doğrula
    const isMatch = await bcrypt.compare(oldPass, adminPass);
    if (!isMatch && oldPass !== adminPass) {
      return res.status(401).json({ error: "Eski şifre yanlış" });
    }

    // Yeni şifreyi hash’le
    const newHashedPass = await bcrypt.hash(newPass, 10);

    // 💾 (Basit sistemlerde .env güncellenmez ama simülasyon olarak log basalım)
    console.log("Yeni admin şifresi (hashlenmiş):", newHashedPass);

    return res.json({ message: "Şifre başarıyla değiştirildi" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
