export async function getWorkputPrograms( token : string | undefined) {

  if(token == undefined)  throw new Error("Could not fetch workout programs. Undefined token");

  const res = await fetch(`https://assignment2.swafe.dk/api/WorkoutPrograms`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch workout program");
  
  const result = await res.json();

  return result;
}