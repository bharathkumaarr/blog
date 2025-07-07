import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data.posts || []));
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold">All Blog Posts</h2>
        {posts.map(post =>(
            <Card key={post._id} className="p-4 hover:shadow-md">
                <Link to={`/post/${post._id}`}>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.content.slice(0, 100)}...</p>
                </Link>
            </Card>
      ))}
      
    </div>
  )
}

export default Posts
