import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";



function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
    }, [id]);


    if (!post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">by {post.author?.username || "Unknown"}</p>
        <p className="text-base mb-4">{post.content}</p>
        <p className="text-sm text-gray-600">{post.likes?.length || 0} likes</p>
      </Card>
    </div>
  )
}

export default PostDetail
