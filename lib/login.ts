export async function login(email: string, password: string) {
  const res = await fetch('https://assignment2.swafe.dk/api/Users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");
  
  return res.json();
}
