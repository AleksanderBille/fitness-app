"use client";

import { useState } from "react";
import Link from "next/link";

interface Exercise {
    exerciseId: number;
    groupId: number;
    name: string;
    description?: string;
    sets?: number;
    repetitions?: number;
    time?: string;
    workoutProgramId: number;
    personalTrainerId: number;
}


interface WorkoutProgram {
    workoutProgramId: number;
    groupId: number;
    name: string;
    description?: string;
    exercises: Exercise[] | null;
    personalTrainerId: number;
    clientId: number;
}

export default function ManagerPrograms({ programs }: { programs: WorkoutProgram[] }) {

const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    sets: 0,
    repetitions: 0,
    time: ""
});

async function handleAddExercise(e: any) {
e.preventDefault();

const res = await fetch("/api/exercise", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    ...newExercise,
    programId: selectedProgram!.workoutProgramId
    })
});

const json = await res.json();
if (!json.success) {
    alert("Error: " + json.error);
    return;
}

setSelectedProgram({
    ...selectedProgram!,
    exercises: [...(selectedProgram!.exercises || []), json.exercise]
});

setNewExercise({
    name: "",
    description: "",
    sets: 0,
    repetitions: 0,
    time: ""
});
}


    const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);


const closeModal = () => setSelectedProgram(null);
if (!programs || programs.length === 0) {
    return (
    <div className="flex items-center justify-center min-h-screen text-gray-700">
        No workout programs found.
    </div>
    );
}
return(
    <div className="max-w-3xl mx-auto p-6">
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white"> All Workout Programs </h1>
        <Link
            href="programs/new_workout"
            className="p-4 rounded-md bg-cyan-950 text-white shadow-lg hover:bg-green-600 transition"> Add new workout </Link>
    </div>
        {programs.map(program => (
            <div
            key={program.workoutProgramId}
            onClick={()=>setSelectedProgram(program)}
            className="p-5 rounded-md bg-cyan-950 text-white mb-6 shadow-lg hover:bg-green-600 transition"
            >
                <h2 className="text-2xl font-semibold text-center mb-2">
                    {program.name}
                </h2>

            {program.description && (
                <p className="text-center text-gray-300 mb-4">
                    {program.description}
                </p>
            )}
                <div className="columns-2 text-center">
                <div className="text-gray-300 text-sm mb-4">
                    <p><strong> Personal trainer ID:</strong>{program.personalTrainerId}</p>
                    <p><strong> Client ID:</strong>{program.clientId}</p>
                </div>
                </div>
            </div>
        ))}
        {
            selectedProgram && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-y-scroll z-50 p-4">
                    <div className="bg-cyan-950 p-6 rounded-mb w-full mas-w-lg shadow-xl text-white relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl transition">
                            X
                        </button>

                        <p className="text-left text-sm">id: {selectedProgram.workoutProgramId}</p>
                        <h2 className="text-2xl font-bold text-center"> {selectedProgram.name}
                        </h2>
                        

                        {selectedProgram.description && (
                        <p className="text-center text-gray-300 mb-4">
                            {selectedProgram.description}
                        </p>
                        )}

                        <h3 className="text-xl font-semibold mb-3 text-center"> Exercises</h3>
                        
                        {selectedProgram.exercises && selectedProgram.exercises.length > 0 ? (
                            selectedProgram.exercises.map((ex) => (
                                <div key={ex.exerciseId} 
                                className="mb-3 p-3 bg-cyan-900 rounded-2xl shadow"> 
                                    
                                    <p className="font-bold text-lg"> {ex.name}</p>
                                    <p className="font-bold text-lg"> {ex.description}</p>

                                    <div className="text-gray-400 text-sm mt-2">
                                        {ex.sets && <p><strong>Sets:</strong> {ex.sets}</p>}
                                        {ex.repetitions && <p><strong>Reps:</strong> {ex.repetitions}</p>}
                                        {ex.time && <p><strong>Time:</strong> {ex.time}</p>}
                                    </div>
                                </div>
                            ))
                        ):(
                            <p className="text-gray-400 italic text-center">
                                No Exercises made for program.
                            </p>
                        )}
                        <h3 className="text-xl font-semibold mt-6 mb-3 text-center">Add Exercise to current program</h3>
                        <form onSubmit={handleAddExercise}
                        className="flex flex-col gap-3 bg-cyan-900 p-4 rounded-xl"
                        >

                        <input
                        type="text"
                        placeholder="Exercise name"
                        value={newExercise.name}
                        onChange={(e) => setNewExercise( {...newExercise, name: e.target.value})}></input>

                        
                        <input
                        type="text"
                        placeholder="Exercise description"
                        value={newExercise.description}
                        onChange={(e) => setNewExercise( {...newExercise, description: e.target.value})}></input>

                        <p>Sets:</p>
                        <input
                        type="number"
                        placeholder="Exercise sets"
                        value={newExercise.sets}
                        onChange={(e) => setNewExercise( {...newExercise, sets: Number(e.target.value)})}></input>

                        
                        <p>Repetitions:</p>
                        <input
                        type="number"
                        placeholder="Time"
                        value={newExercise.repetitions}
                        onChange={(e) => setNewExercise( {...newExercise, repetitions: Number(e.target.value)})}></input>
                        <input
                        type="text"
                        placeholder="Time"
                        value={newExercise.time}
                        onChange={(e) => setNewExercise( {...newExercise, time: e.target.value})}></input>

                        <button className="bg-cyan-700 hover:bg-green-600 p-2 rounded transition">
                            Add Exercise
                        </button>
                        </form>
                        <div className="flex justify-center mt-4">
                            <button onClick={closeModal}
                            className="px-8 py-2 bg-gray-700 rounded-700 hover:bg-gray-600 rounded-4xl transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  );
}