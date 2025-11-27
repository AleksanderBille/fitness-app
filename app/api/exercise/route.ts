import {addExercise  } from "@/lib/addExercise";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description,sets, repetitions,time, programId } = await req.json()
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if(!token) {
      return NextResponse.json(
        { success: false, error: "Token could not be retrieved." },
        { status: 500 }
      );
    }

    const result = await addExercise(name, description, sets, repetitions, time, programId, token );

    return result

  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e?.message || String(e) },
      { status: 500 }
    );
  }
}
