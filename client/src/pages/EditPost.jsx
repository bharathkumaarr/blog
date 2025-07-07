import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image || "");
      });
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, image }),
    });

    if (res.ok) {
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Edit Blog Post</h2>
      <Input value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea rows="6" value={content} onChange={e => setContent(e.target.value)} />
      <Input value={image} onChange={e => setImage(e.target.value)} placeholder="Optional image URL" />
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
}

export default EditPost;
