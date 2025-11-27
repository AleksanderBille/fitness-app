"use client"

import { useState } from "react";
import ClientCard from "../cards/ClientCard";
import CreateUserComponent from "../components/CreateUserComponent";

interface ClientsPageProps {
  clients: User[];
}

export default function ClientsPage({ clients }: ClientsPageProps) {
  const [clientList, setClientList] = useState<User[]>(clients);

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT SIDEBAR */}
      <div className="w-80 p-6 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Clients</h2>

        {clientList.map((c) => (
          <ClientCard key={c.userId} client={c} />
        ))}
      </div>

      <CreateUserComponent 
        setClientList={setClientList}
      />
    </div>
  );
}

