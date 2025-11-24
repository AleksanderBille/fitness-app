"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/users";
    } else {
      setEmail("");
      setPassword("");
    }
  }

  async function flushCookie() {
    const res = await fetch("/api/login", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-cyan-950 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            Log in
          </button>
        </form>
      </div>
    </div>

  );
}
