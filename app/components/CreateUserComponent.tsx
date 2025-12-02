"use client"

import { useState } from "react";

interface CreateUserComponentProps {
  setClientList: React.Dispatch<React.SetStateAction<User[]>> | null;
}

export default function CreateUserComponent({
  setClientList: setUserList
}: CreateUserComponentProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationErrors({});
    setError("");

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 
        "Content-Type": "application/json" 
      }
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error || "Something went wrong.");

      // Set validation errors if provided
      if (data.validation) {
        setValidationErrors(data.validation);
      }
      return
    } else {
      setError("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }

    // Add the user to the list if required
    if (setUserList != null) {
      setUserList(prev => [...prev, data.user]);
    }
  }

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold">Create new user</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {validationErrors.FirstName && (
          <p className="text-red-600 text-sm mt-1">
            {validationErrors.FirstName[0]}
          </p>
        )}

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {validationErrors.LastName && (
          <p className="text-red-600 text-sm mt-1">
            {validationErrors.LastName[0]}
          </p>
        )}
        
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {validationErrors.Email && (
          <p className="text-red-600 text-sm mt-1">
            {validationErrors.Email[0]}
          </p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {validationErrors.Password && (
          <p className="text-red-600 text-sm mt-1">
            {validationErrors.Password[0]}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-cyan-950 text-white py-2 rounded-xl hover:bg-green-500 active:scale-95 transition-all shadow-md"
        >
          Submit
        </button>
      </form>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}     
    </div>
  )
}
