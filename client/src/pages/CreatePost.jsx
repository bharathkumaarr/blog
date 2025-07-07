import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const handleSubmit = async () => {

        try {
        const res = await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, image }),
        });

        const data = await res.json();
        if (res.ok) {
            navigate("/posts");
        } else {
            setMsg(data.error || "Failed to create post");
        }
        } catch (err) {
        setMsg("Something went wrong");
        }
    };

    const suggestTitle = () => {
        setTitle("10 Productivity Tips for Developers");
    };

    const suggestContent = () => {
        setContent("Here are 10 practical and actionable productivity tips for software developers...");
    };


  return (
   <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Create Blog Post</h2>

      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <div className="flex gap-2">
        <Button variant="outline" onClick={suggestTitle}>Suggest Title</Button>
        <Button variant="outline" onClick={suggestContent}>Suggest Content</Button>
      </div>

      <Textarea rows="6" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <Input placeholder="Optional image URL" value={image} onChange={e => setImage(e.target.value)} />

      <Button onClick={handleSubmit}>Submit</Button>
      {msg && <p className="text-sm text-red-500">{msg}</p>}
    </div>
  )
}

export default CreatePost
