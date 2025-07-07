import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');


    const handleRegister = async () => {
        try {
            const res = await fetch( "http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password})
            })
            const data = await res.json()
            if (res.ok) {
                setMsg("Registration succesfull! You can login now.")
            } else {
                setMsg(data.error || "Registration failed");
            }
        } catch (err) {
            setMsg("Something went wrong");
    }
    }


  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)} />
        <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
      {msg && <p className="text-sm text-red-500">{msg}</p>}

      
    </div>
  )
}

export default Register
