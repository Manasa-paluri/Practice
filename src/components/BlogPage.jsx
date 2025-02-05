import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";

const BlogPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const blogsData = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogsData.find((b) => b.id === parseInt(id)); // Find the blog by ID

  if (!blog) {
    return <div>Blog not found</div>; // Show a message if the blog isn't found
  }

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // Fetch likes and comments from localStorage when the component loads
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};

    if (savedLikes[blog.id]) setLikes(savedLikes[blog.id]);
    if (savedComments[blog.id]) setComments(savedComments[blog.id]);
  }, [blog.id]);

  useEffect(() => {
    // Save likes and comments in localStorage whenever they change
    localStorage.setItem("likes", JSON.stringify({ [blog.id]: likes }));
    localStorage.setItem("comments", JSON.stringify({ [blog.id]: comments }));
  }, [likes, comments, blog.id]);

  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => {
    if (commentText.trim()) {
      setComments((prev) => [...prev, commentText]);
      setCommentText("");
    }
  };

  const handleShare = () => {
    const subject = `Check out this blog: ${blog.title}`;
    const body = `Here's the link to the blog: ${window.location.href}`;
    const mailtoLink = `mailto:dummyemail@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the email client with the pre-filled subject and body
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="rounded-lg mt-4" />
      <p className="mt-4 text-gray-700">{blog.content}</p>
      <div className="flex justify-between items-center mt-6">
        <button onClick={handleLike} className="flex items-center">
          <Heart className="mr-2" /> Like {likes}
        </button>
        <button onClick={handleShare} className="flex items-center">
          <Share2 className="mr-2" /> Share
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Comments</h2>
        {comments.map((c, index) => (
          <p key={index} className="border-b py-2">{c}</p>
        ))}
        <textarea
          className="border p-2 w-full mt-3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button onClick={handleComment} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Add Comment
        </button>
      </div>
    </div>
  );
};


export default BlogPage;
