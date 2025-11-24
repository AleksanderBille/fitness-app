// app/managers/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManagerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  return <p>Manager Page</p>;
}