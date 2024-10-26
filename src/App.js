import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Editor from "./components/Editor";
import data from "./data.json";
import { Route, Routes, Link } from "react-router-dom";
import Hello from "./pages/Hello";
import Second from "./pages/Second";
import Page from "./components/Page";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const navigate = useNavigate();

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
    <div className="App">
      <nav className="nav__container">
        <div className="heading__container">
          <h1 className="banner__heading non-selectable">Dex</h1>
        </div>
        <button className="nav__toggle non-selectable" onClick={toggleNav}>
          ☰
        </button>
        <div className={`nav__list ${isNavOpen ? "nav__list--open" : ""}`}>
          {isNavOpen && (
            <button className="nav__close" onClick={toggleNav}>
              &times;
            </button>
          )}
          <ul className="nav__items">
            <li className="nav__item">Home</li>
            <li className="nav__item">About</li>
            <li className="nav__item">Services</li>
            <li className="nav__item">Contact</li>
          </ul>
        </div>
      </nav>
      <div className="nav__break"></div>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className="hero__container">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => {
                    console.log("Clicked on:", blog._id);
                    setActiveBlog(blog._id);
                    navigate("/page");
                  }}
                >
                  <Card
                    title={blog.heading}
                    // onClick={() => {
                    //   console.log("Clicked on:", blog._id);
                    //   setActiveBlog(blog._id);
                    //   navigate("/page");
                    // }}
                  />
                  <hr className="nav__break"></hr>
                </div>
              ))}
            </div>
          }
        ></Route>
        <Route path="/hello" element={<Hello />} />
        <Route path="/second" element={<Second />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/page" element={<Page id={activeBlog} />} />
      </Routes>
    </div>
  );
}

export default App;
