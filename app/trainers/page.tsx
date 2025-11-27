import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainersPage from "./TrainersPage";

export default async function managerPage() {    
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if(!token) { redirect("/login") }
  
  return(
    <div className="flex min-h-screen">
      <TrainersPage />
    </div>
  );
}