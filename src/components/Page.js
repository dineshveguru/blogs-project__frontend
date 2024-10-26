import axios from "axios";
import React, { useState, useEffect } from "react";

function Page({ id }) {
  const [blogs, setBlogs] = useState([]);
  console.log("ID:", id);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://blogs-project-server.onrender.com/api/blogs"
        );
        console.log(data);
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      {blogs.length > 0 ? (
        blogs
          .filter((blog) => blog._id === id)
          .map((blog, index) => (
            <div key={index}>
              <h2>{blog.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))
      ) : (
        <p>No blog available</p>
      )}
    </div>
  );
}

export default Page;
