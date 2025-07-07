import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";




import { useSelector } from "react-redux";

import { useNavigate, Link } from "react-router-dom";






function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");




  useEffect(() => {
  fetch(`http://localhost:3000/api/posts/${id}`)
    .then(res => res.json())
    .then(data => setPost(data));
  fetch(`http://localhost:3000/api/comments/${id}`)
    .then(res => res.json())
    .then(data => setComments(data));

  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) navigate("/posts");
};
const handleCommentSubmit = async () => {
  if (!newComment.trim()) return;

  const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: newComment }),
  });

  if (res.ok) {
    const data = await res.json();
    setComments(prev => [data, ...prev]);
    setNewComment("");
  }
};

// const handleDeleteComment = async (commentId) => {
//   const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (res.ok) {
//     setComments(prev => prev.filter(c => c._id !== commentId));
//   }
// };


  if (!post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">by {post.author?.username || "Unknown"}</p>
        <p className="text-base mb-4">{post.content}</p>
        <p className="text-sm text-gray-600">{post.likes?.length || 0} likes</p>
        
        


        {user && (
  <Button
    onClick={async () => {
      const res = await fetch(`http://localhost:3000/api/posts/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        // Re-fetch updated post with new like count
        const updated = await res.json();
        setPost(updated);
      }
    }}
    className="mt-2"
  >
    {post.likes?.includes(user.id) ? "Unlike" : "Like"}
  </Button>
)}

      </Card>
      {user?.id === post.author?._id?.toString() && (
      <div className="flex gap-2 mt-4">
        <Link to={`/edit/${post._id}`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>

      
)}

<div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Comments</h3>

  {user && (
    <div className="flex gap-2 mb-4">
      <Input
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <Button onClick={handleCommentSubmit}>Post</Button>
    </div>
  )}

  {!comments.length ? (
    <p className="text-sm text-gray-500">No comments yet.</p>
  ) : (
    <div className="space-y-2">
      {comments.map(comment => (
        <div key={comment._id} className="p-2 border rounded-md">
          <p className="text-sm">{comment.content}</p>
          <p className="text-xs text-gray-500">
            by {comment.author?.username || "Anonymous"}
          </p>
          {/* {user?.id === comment.author?._id && (
            <Button
              variant="destructive"
              size="sm"
              className="mt-1"
              onClick={() => handleDeleteComment(comment._id)}
            >
              Delete
            </Button>
          )} */}
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  )
}

export default PostDetail
