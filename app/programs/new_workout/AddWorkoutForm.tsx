"use client";

import { useState } from "react";

export default function AddWorkoutForm({ clients }: { clients: any[] }) {
    const [clientId, setClientId] = useState<string>("");
    
    const [programName, setProgramName] = useState("");
    const [programDescription, setProgramDescription] = useState("");

    const [exerciseName, setExerciseName] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [exerciseSets, setEXerciseSets] = useState<number>(0)
    const [exerciseReps, setEXerciseReps] = useState<number>(0)

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const body = {
      name: programName,
      description: programDescription,
      clientId: Number(clientId),
      exercises: [
        {
          name: exerciseName,
          description: exerciseDescription,
          sets: exerciseSets,
          repetitions: 0,
          time: "00:00:00"
        }
      ]
    };

    const res = await fetch("/api/newWorkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!data.success) {
      setMessage("Error:" + data.error);
    } else {
      setMessage("Workout program created!");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
    
    <div>
        <select
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            >
            <option value="">-- Select Client --</option>
            {clients.map((client: any) => (
                <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
                </option>
            ))}
        </select>
    </div>

      <div>
        <label className="block mb-1">Program Name</label>
        <input
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Program Description</label>
        <textarea
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={programDescription}
          onChange={(e) => setProgramDescription(e.target.value)}
          required
        />
      </div>

      <h2 className="text-xl font-semibold mt-4">Exercise</h2>

      <div>
        <label className="block mb-1">Exercise Name</label>
        <input
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Exercise Description</label>
        <textarea
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={exerciseDescription}
          onChange={(e) => setExerciseDescription(e.target.value)}
          required
        />
        </div>
            <label className="block mb-1"> Sets:</label>
                <input
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                value={exerciseSets}
                onChange={(e) => setEXerciseSets(Number(e.target.value))}
                required
            />
        <div>

        </div>
        <div>
            <label className="block mb-1"> Repetetions:</label>
                <input
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                value={exerciseReps}
                onChange={(e) => setEXerciseReps(Number(e.target.value))}
                required
            />
        </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Saving..." : "Create Program"}
      </button>

      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}
