import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleLogin = async() =>  {
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            })
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                setMsg("Login successfull!")
            } else {
                setMsg(data.error || "Login failed")
            }


        } catch (err) {
            setMsg("Something went wrong")
        }

    }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <Input type="email"
        placeholder='Email'
        value={email}
        onChange={e=> setEmail(e.target.value)} />
        <Input type="password"
        placeholder="Password"
        value= {password}
        onChange={e=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Login</Button>
        {msg && <p className='text-sm text-red-500'>{msg}</p>}

    </div>
  )
}

export default Login
