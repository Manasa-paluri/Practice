import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogApp from "./components/BlogApp";
import BlogPage from "./components/BlogPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogApp />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;


