"use client"

interface ErrorPageProps {
  error?: boolean;
  errorMessage?: string;
  status: number;
}

export default function ErrorPage({ error, errorMessage, status }: ErrorPageProps) {
  if (!error) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          {status ?? "Error"}
        </h1>
        <p className="text-lg text-gray-700">
          {errorMessage ?? "Something went wrong."}
        </p>
      </div>
    </div>
  );
}