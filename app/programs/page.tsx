import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ManagerPrograms from "./manager_programs";

export default async function ManagerProgramsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    console.log("FETCH URL:", `${baseUrl}/api/allworkoutPrograms`);

  const res = await fetch(`${baseUrl}/api/allworkoutPrograms`, {
    method: "GET",
    headers: {
      "Cookie": `auth_token=${token}`
    },
    cache: "no-store"
  });

  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {data.error}
      </div>
    );
  }

  return <ManagerPrograms programs={data} />;
}
