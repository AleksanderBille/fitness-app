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
            role = decoded.role || null; // Adjust depending on your token shape
        } catch (e) {
            console.error("Failed to decode token:", e);
        }
    }

    return (
    <nav className="w-full bg-black shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
            <Link href="/">MyApp</Link>
            </div>

            <ul className="flex space-x-6 text-lg text-gray-200">
            <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            </li>

            {!token && (
                <li>
                <Link href="/login" className="hover:text-blue-400 transition-colors">
                    Login
                </Link>
                </li>
            )}

            {role === "manager" && (
                <li>
                <Link href="/managers" className="hover:text-blue-400 transition-colors">
                    Managers
                </Link>
                </li>
            )}

            {role === "trainer" && (
                <li>
                <Link href="/trainer" className="hover:text-blue-400 transition-colors">
                    Trainers
                </Link>
                </li>
            )}

            {token && (
                <LogoutButton />
            )}
            </ul>
        </div>
    </nav>
  );
}
