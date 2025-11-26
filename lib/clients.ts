export async function getClientsForPersonalTrainer(token : string | undefined) {
  if(token == undefined)  throw new Error("Could not fetch workout programs. Undefined token");

  const res = await fetch(`https://assignment2.swafe.dk/api/Users/Clients`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch clients" + res.status);
  
  const result = await res.json();

  return result;
}