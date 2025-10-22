import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user, pass } = await req.json();

  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    // 🔑 basit token
    const token = Buffer.from(`${user}:${Date.now()}`).toString("base64");
    return NextResponse.json({ token });
  }

  return NextResponse.json(
    { error: "Geçersiz kullanıcı adı veya şifre" },
    { status: 401 }
  );
}
