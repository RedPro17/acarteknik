import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI tanımlı değil (.env dosyasını kontrol et)");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Request = mongoose.models.Request || mongoose.model("Request", RequestSchema);

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const { name, email, phone, service, message } = body;

  if (!name || !email || !phone || !service || !message) {
    return NextResponse.json({ error: "Tüm alanlar doldurulmalı" }, { status: 400 });
  }

  try {
    await Request.create({ name, email, phone, service, message });
    return NextResponse.json({ message: "Talep başarıyla kaydedildi ✅" }, { status: 200 });
  } catch (err) {
    console.error("DB kayıt hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
