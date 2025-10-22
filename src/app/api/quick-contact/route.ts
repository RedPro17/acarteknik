import { NextResponse } from "next/server";
import mongoose from "mongoose";
import QuickRequest from "@/models/QuickRequest";

const MONGO_URI = process.env.MONGO_URI || "";

// MongoDB bağlantısı
async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Yeni QuickRequest oluştur
    const newRequest = new QuickRequest(data);
    await newRequest.save();

    return NextResponse.json({ message: "Talep başarıyla alındı!" });
  } catch (err: unknown) {
    let errorMessage = "Bilinmeyen bir hata oluştu";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error("🔥 QuickRequest Hatası:", errorMessage);

    return NextResponse.json(
      { error: "Sunucu hatası", details: errorMessage },
      { status: 500 }
    );
  }
}
