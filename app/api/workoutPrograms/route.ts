import { getWorkputProgramsByUserId } from "@/lib/workoutPrograms";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // get from query
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, errorMessage: "Token could not be retrieved." },
        { status: 500 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, errorMessage: "Missing userId" },
        { status: 400 }
      );
    }

    const result = await getWorkputProgramsByUserId(userId, token);

    return NextResponse.json(result);

  } catch (e: any) {
    return NextResponse.json(
      { success: false, errorMessage: e?.message || String(e) },
      { status: 500 }
    );
  }
}


