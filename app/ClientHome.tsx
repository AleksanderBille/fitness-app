"use client";

import { useState } from "react";

interface ClientHomeProps {
  workoutPrograms: WorkoutProgram[];
}

export default function ClientHome({ workoutPrograms }: ClientHomeProps) {
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(
    workoutPrograms[0] ?? null
  );

  if (workoutPrograms.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700">
        No workout programs available.
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    
    const program = workoutPrograms.find(
      (p) => p.workoutProgramId === selectedId
    );
    setSelectedProgram(program ?? null);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {workoutPrograms.length > 1 ? (
        <div className="mb-4">
          <label className="flex items-center justify-center block mb-2 font-semibold text-white-700">
            Select a workout program
          </label>
          <select
            value={selectedProgram?.workoutProgramId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-white bg-cyan-950"
          >
            {workoutPrograms.map((p) => (
              <option key={p.workoutProgramId} value={p.workoutProgramId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {selectedProgram && (
        <div className="p-4 border rounded-md bg-cyan-950">
          <h2 className="flex items-center justify-center text-xl font-bold mb-2">Workout: {selectedProgram.name}</h2>
          {selectedProgram.description && (
            <p className="flex items-center justify-center text-white-700">{selectedProgram.description}</p>
          )}
          <br/>
          {selectedProgram.exercises?.map((e) => (
            <div key={e.exerciseId} className="mb-4">
                <div className="flex items-center justify-center font-semibold">
                {e.name}
                {e.sets ? ` | ${e.sets} sets` : ""}
                {e.repetitions ? ` | ${e.repetitions} reps` : ""}
                {e.time ? ` | ${e.time}` : ""}
                </div>
                {e.description && (
                <p className="text-center text-gray-300">{e.description}</p>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
