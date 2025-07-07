import { Routes, Route, Link } from "react-router-dom";
import  Login from "./pages/Login";
import  Register from "./pages/Register";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";

import { Button } from "@/components/ui/button";






function App() {


  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to='/login' className="text-blue-600 underline">Login</Link>
        <Link to='/register' className="text-blue-600 underline">Register</Link>
        <Link to="/posts" className="text-blue-600 underline">Posts</Link>
        <Link to="/create">
          <Button>Create New Post</Button>
        </Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>

  )
}

export default App
