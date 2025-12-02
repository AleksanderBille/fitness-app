import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";


export async function addprogram(name: string, description: string, exercises: any[], clientId: Number, token :string | undefined) {
  if(token == undefined)  throw new Error("Could not fetch workout programs. Undefined token");
  
  let roleOfRequester: string | null = null;
  let userIdOfRequester: number | null = null;

  try {
    const decoded: any = jwtDecode(token);
    roleOfRequester = decoded.Role || null;
    userIdOfRequester = decoded.UserId || null;
  } catch (e) {
    throw new Error("Could not decode token");
  }


  const res = await fetch(`https://assignment2.swafe.dk/api/WorkoutPrograms`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        name,
        description,
        exercises: [
          {
            name,
            description,
            sets: 0,
            repetitions: 0,
            time: "00:00:00",
          },
        ],
        clientId: userIdOfRequester, // or whichever client should own it
      }),
    }
  );


  if (!res.ok) {
    const errorBody = await res.json();
    return NextResponse.json(
      { success: false, error: errorBody.error, validation: errorBody.errors },
      { status: 400 }
    );
  }

  const result = await res.json()

  return NextResponse.json(
      { success: true, data: result}
    );
}