import { Routes, Route, Link } from "react-router-dom";
import  Login from "./pages/Login";
import  Register from "./pages/Register";


function App() {


  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to='/login' className="text-blue-600 underline">Login</Link>
        <Link to='/register' className="text-blue-600 underline">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>

  )
}

export default App
