import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Placeholder image URLs (for fallback if no image is selected)
const placeholderImages = [
  "https://th.bing.com/th/id/OIP.GrH6P_BJ10DdckmGWOOA_gHaE8?w=245&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.dsCHwQe9-4raXkTFQBFsJwHaD7?w=287&h=180&c=7&r=0&o=5&pid=1.7",
  "https://th.bing.com/th/id/OIP.P_lOZlIrJdrSHdtbYlJmUAHaDN?w=304&h=151&c=7&r=0&o=5&pid=1.7"
];

const BlogApp = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    image: "", // URL of the image (set when a file is selected)
    content: "",
  });

  // Default blogs (to be set if localStorage is empty)
  const defaultBlogs = [
    {
      id: 1,
      title: "React Hooks: A Deep Dive into Functional Components and State Management",
      image: placeholderImages[0],
      content: "React Hooks, introduced in React 16.8, revolutionized the way developers write and manage state in functional components, eliminating the need for class components to handle state and lifecycle methods. Hooks, such as `useState`, `useEffect`, `useContext`, `useReducer`, and `useRef`, allow developers to add state, manage side effects, share logic, and interact with the DOM in a more declarative and concise way. `useState` allows functional components to hold and update state, while `useEffect` manages side effects like data fetching or subscriptions. `useContext` provides a simpler way to consume values from context, and `useReducer` is used for more complex state logic. `useRef` offers a way to persist values across renders without causing re-renders. The introduction of hooks simplified the development process by enabling developers to write cleaner, reusable, and more modular code, and custom hooks allow for further abstraction and sharing of logic across components. While hooks have streamlined React development, developers should follow best practices such as avoiding conditional hook calls, managing dependencies in `useEffect`, and using `useReducer` judiciously for complex state management. Overall, hooks have enhanced the flexibility, maintainability, and performance of React applications, making them a cornerstone of modern React development.",
    },
    {
      id: 2,
      title: "Know more about Bi-LSTM",
      image: placeholderImages[1],
      content: "Bidirectional Long Short-Term Memory (BiLSTM) networks are an extension of traditional LSTM networks that process data in two directions, forward and backward, simultaneously, making them more powerful for tasks involving sequential data. While traditional LSTMs process sequences in a single direction, which limits their ability to capture context from both past and future time steps, BiLSTMs address this by using two LSTMs—one that processes the sequence from left to right and another that processes it from right to left. This dual processing enables BiLSTMs to capture richer, bidirectional context, which is especially beneficial in applications like natural language processing, speech recognition, and time series analysis, where understanding both preceding and succeeding elements in a sequence is crucial. The outputs from both directions are often combined, providing a more comprehensive understanding of the sequence, which makes BiLSTMs particularly effective for tasks that require deep contextual understanding. However, the increased computational cost due to processing in both directions is a tradeoff for their enhanced performance in capturing complex dependencies in data.",
    },
    {
      id: 3,
      title: "Sample Blog 3",
      image: placeholderImages[2],
      content: "This is the content of the third blog.",
    }
  ];

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));

    if (!storedBlogs || storedBlogs.length === 0) {
      // If no blogs exist in localStorage, set the default blogs
      localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
      setBlogs(defaultBlogs);
    } else {
      // Otherwise, load the blogs from localStorage
      setBlogs(storedBlogs);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file that was uploaded
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog((prevBlog) => ({
          ...prevBlog,
          image: reader.result, // Set the image URL to the file's data URL
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlogEntry = {
      ...newBlog,
      id: Date.now(), // Use Date.now() to ensure a unique id
    };
  
    const updatedBlogs = [...blogs, newBlogEntry];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  
    // Reset form
    setNewBlog({ title: "", image: "", content: "" });
  };
  

  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id); // Remove the blog by id
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs)); // Save updated list to local storage
  };

  return (
    <div>
      <header className="p-4 bg-gray-900 text-white flex justify-between">
        <h1 className="text-xl">Your Go-To Blog Spot</h1>
        <nav>
          <Link className="text-white mr-4" to="/">Home</Link>
          <Link className="text-white" to="/">Contact Us</Link>
        </nav>
      </header>

      {/* Display Blogs */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p>No blogs available. Add some blogs!</p> // Display message if no blogs are available
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded-lg shadow-md">
              <img src={blog.image} alt={blog.title} className="rounded-lg" />
              <div>
                <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
                <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mt-3">
                  {/* Open the blog in a new tab */}
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="bg-transparent text-blue-500"
                  >
                    Read More
                  </Link>

                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Blog Form */}
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
            <label htmlFor="image" className="block">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*" // Allow only image files
              onChange={handleImageChange}
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
    </div>
  );
};

export default BlogApp;
