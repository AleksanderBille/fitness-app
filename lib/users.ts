import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function createUser(firstName: string, lastName: string, email: string, password: string, token : string | undefined) {
  if(token == undefined)  throw new Error("Could not fetch workout programs. Undefined token");
  
  let personalTrainerId: number | null = null;
  let accountType: string | null = null

  let roleOfRequester: string | null = null;
  let userIdOfRequester: number | null = null;

  try {
    const decoded: any = jwtDecode(token);
    roleOfRequester = decoded.Role || null;
    userIdOfRequester = decoded.UserId || null;
  } catch (e) {
    throw new Error("Could not decode token");
  }

  if(roleOfRequester == "PersonalTrainer") {
    accountType = "Client";
    personalTrainerId = userIdOfRequester;
  }
  else if(roleOfRequester == "Manager") {
    accountType = "PersonalTrainer";
  }
  else {
    throw new Error("Clients and unknown roles cannot make requests to create users.")
  }

  const res = await fetch(`https://assignment2.swafe.dk/api/Users`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      firstName, 
      lastName, 
      email, 
      password, 
      personalTrainerId, 
      accountType 
    })
  });

  if (!res.ok) {
    const errorBody = await res.json();
    return NextResponse.json(
      { success: false, error: errorBody.error, validation: errorBody.errors },
      { status: 400 }
    );
  }

  const result = await res.json()

  return NextResponse.json(
      { success: true, user: result}
    );
}