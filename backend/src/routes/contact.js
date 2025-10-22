import express from "express";
import Request from "../models/Request.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ✉️ Onay e-postası gönderim fonksiyonu
const sendApprovalEmail = async (to, name, service) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"AÇAR TEKNİK" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Talebiniz Onaylandı ✅",
      headers: { "Content-Type": "text/html; charset=UTF-8" },
      html: `
        <div style="font-family:'Segoe UI', Arial, sans-serif; background-color:#f8f9fa; padding:40px;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            
            <div style="background-color:#d00000; padding:20px; text-align:center;">
              <img src="public/logo.png" alt="AÇAR TEKNİK" style="width:100px; margin-bottom:10px;" />
              <h2 style="color:white; margin:0;">AÇAR TEKNİK</h2>
              <p style="color:white; margin:0; font-size:14px;">İklimlendirme & Kombi Servisi</p>
            </div>

            <div style="padding:30px; color:#333;">
              <h3 style="color:#d00000;">Merhaba ${name},</h3>
              <p style="font-size:16px;">
                Göndermiş olduğunuz <strong>${service}</strong> talebiniz 
                <span style="color:green; font-weight:bold;">onaylanmıştır</span>.
              </p>
              <p style="font-size:15px; line-height:1.6;">
                En kısa sürede uzman ekibimiz sizinle iletişime geçecektir. 
                İlginiz için teşekkür eder, iyi günler dileriz.
              </p>

              <p style="margin-top:30px; font-size:14px;">
                Saygılarımızla, <br/>
                <strong>AÇAR TEKNİK Ekibi</strong>
              </p>
            </div>

            <div style="background-color:#f1f1f1; text-align:center; padding:15px; font-size:13px; color:#666;">
              <p>📍 Samsun, Türkiye</p>
              <p>📞 0 (532) 000 00 00 | ✉️ acar.teknik.info@gmail.com</p>
              <p style="margin-top:10px; font-size:12px;">© ${new Date().getFullYear()} AÇAR TEKNİK. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ E-posta gönderildi: ${to}`);
  } catch (err) {
    console.error("❌ E-posta gönderilemedi:", err);
  }
};

// 📨 Yeni talep oluştur
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(200).json({ message: "Talep başarıyla kaydedildi" });
  } catch (err) {
    console.error("❌ POST hata:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// 📋 Tüm talepleri al
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error("❌ GET hata:", err);
    res.status(500).json({ error: "Veriler alınamadı" });
  }
});

// 🗑️ Talep sil
router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Talep silindi" });
  } catch (err) {
    console.error("❌ DELETE hata:", err);
    res.status(500).json({ error: "Silme başarısız" });
  }
});

// ✅ Talebi onayla (status değiştir + mail gönder)
router.put("/:id/approve", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Talep bulunamadı" });

    request.status = "approved";
    await request.save();

    await sendApprovalEmail(request.email, request.name, request.service);

    res.status(200).json({ message: "Talep onaylandı ve e-posta gönderildi", request });
  } catch (err) {
    console.error("❌ PUT hata:", err);
    res.status(500).json({ error: "Güncelleme veya mail gönderim hatası" });
  }
});

export default router;
