import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ErrorPage from "../ErrorPage";
import ClientsPage from "./ClientsPage";


export default async function Clients() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const res = await fetch(`${baseUrl}/api/clients`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Cookie": `auth_token=${token}`
    },
    cache: "no-store",
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    return <ErrorPage error={true} errorMessage={data.error} status={res.status}/>;
  }

  // otherwise data is the array
  return (
    <ClientsPage clients={data} />
  );
}