import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddWorkoutForm from "./AddWorkoutForm";

export default async function AddWorkoutPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/clients`, {
    method: "GET",
    headers: { Cookie: `auth_token=${token}` },
    cache: "no-store",
  });

  const clientData = await res.json();

  if (!res.ok) {
    return (
      <div className="text-red-500 p-6">
        Error loading clients: {clientData.error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Create a New Workout Program
      </h1>

      <AddWorkoutForm clients={clientData} />
    </div>
  );
}
