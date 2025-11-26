import { NextResponse } from "next/server";
import { login } from "@/lib/login";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const result = await login(email, password);

    const token = result.jwt;

    // Must use response.cookies -- not cookies()
    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    return res;
  } catch (e) {
    console.error("Login error:", e);

    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
