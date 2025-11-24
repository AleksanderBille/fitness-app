import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { login } from "@/lib/login";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const result = await login(email, password); 
  const token = result.token; // whatever your API returns

  const cookieStore = await cookies();

  // Store token securely in HttpOnly cookie
  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 // 1 day
  });

  return NextResponse.json({ success: true });
}
