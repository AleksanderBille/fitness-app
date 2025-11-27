import { cookies } from "next/headers";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Step 2: Extract role from token
    let role: string | null = null;

    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            role = decoded.Role || null; // Adjust depending on your token shape
        } catch (e) {
            console.error("Failed to decode token:", e);
        }
    }

    return (
    <nav className="w-full bg-black shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white transaction hover:text-green-400">
          <Link href="/">FitByAndAlekTho</Link>
        </div>

        <ul className="flex space-x-6 text-lg text-gray-200">
          {!token && (
            <li>
              <Link href="/login" className="hover:text-green-400 transition-colors">
                Login
              </Link>
            </li>
          )}

          {token && (
            <ul className="flex space-x-6 text-lg text-gray-200">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
            </li>
            {role === "PersonalTrainer" && (
              <ul className="flex space-x-6 text-lg text-gray-200">
                <li>
                  <Link href="/clients" className="hover:text-green-400 transition-colors">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="hover:text-green-400 transition-colors">
                    Programs
                  </Link>
                </li>
              </ul>
            )}
            {role === "Manager" && (
              <ul className="flex space-x-6 text-lg text-gray-200">
                <li>
                  <Link href="/trainers" className="hover:text-blue-400 transition-colors">
                    Trainers
                  </Link>
                </li>
              </ul>
            )}
            <li>
              <LogoutButton />
            </li>
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
}
