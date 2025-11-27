import { getWorkputPrograms } from "@/lib/allworksouts";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


// Potentially call to get all programs for current user
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;


        if(!token) {
          return NextResponse.json(
            { success: false, error: "Token could not be retrieved."},
            { status: 500 }
          );
        }

        const result = await getWorkputPrograms(token);

        return NextResponse.json(result)
    } catch (e: any) {
        return NextResponse.json(
            { success: false, error: e?.message || String(e) },
            { status: 500 }
        );
    }
} 