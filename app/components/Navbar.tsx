import Link from "next/link";


export default function Navbar()
{
    return(
        <nav className="w-full bg-black shadow-md p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold">
                    <Link href={"/"}>MyApp</Link>
                </div>
                <ul className="flex space-x-6 text-lg">
                    <li>
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        </li>
                        <li>
                        <Link href="/login" className="hover:text-blue-600 transition-colors">Login Page</Link>
                        </li>
                        <li>
                        <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                        </li>
                </ul>
            </div>
        </nav>
    );
}