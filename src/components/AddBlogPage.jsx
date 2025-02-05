import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    image: "",
    content: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlogEntry = {
      ...newBlog,
      id: Date.now(), // Use timestamp as ID
    };
    // Here you can add logic to save the new blog entry to state or backend
    console.log("New Blog Added:", newBlogEntry);
    navigate("/"); // Redirect back to Home after adding the blog
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div className="mb-4">
          <label htmlFor="title" className="block">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            className="border p-2 w-full mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={newBlog.image}
            onChange={handleInputChange}
            className="border p-2 w-full mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block">Content</label>
          <textarea
            id="content"
            name="content"
            value={newBlog.content}
            onChange={handleInputChange}
            className="border p-2 w-full mt-1"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
