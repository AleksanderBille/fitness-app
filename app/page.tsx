import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomepageClient from "./HomepageClient";
import { jwtDecode } from "jwt-decode";
import ClientHome from "./ClientHome";
import ErrorPage from "./ErrorPage";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  let role: string | null = null;
  let userId: string | null = null;

  try {
    const decoded: any = jwtDecode(token);
    role = decoded.Role || null;
    userId = decoded.UserId || null;
  } catch (e) {
    console.error("Failed to decode token:", e);
  }
  
  if (role == "Client") {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/workoutPrograms?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `auth_token=${token}`
      },

      cache: "no-store",
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return <ErrorPage error={true} errorMessage={data.errorMessage} status={res.status}/>;
    }

    // otherwise data is the array
    return <ClientHome workoutPrograms={data} />;
  }

  else {
    return (
      <HomepageClient />
    )
  }
}
