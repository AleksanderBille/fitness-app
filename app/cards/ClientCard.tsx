"use client"

interface ClientCardProps {
    client : Client
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-cyan-950 text-white border border-cyan-700 rounded-xl p-4 mb-3 shadow-md hover:shadow-lg transition">
      <p className="font-semibold text-lg">{client.firstName} {client.lastName}</p>
      <p className="text-gray-300">{client.email}</p>
    </div>
  );
}
