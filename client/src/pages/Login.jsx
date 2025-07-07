import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';




function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async() =>  {
        try {
            const res = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            })
            const data = await res.json();
            if (res.ok) {
                dispatch(loginSuccess({ token: data.token, user: data.user }));
                navigate("/posts");

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
