import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TODO: Add clear button to clear the editor
const Editor = () => {
  const editor = useCreateBlockNote();
  const [blogHeading, setBlogHeading] = useState("");
  const [blog, setBlog] = useState(null);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const submitButtonHandler = async () => {
    axios
      .post(
        "http://localhost:5000/api/submit",
        {
          heading: blogHeading,
          content: blog,
        },
        axiosConfig
      )
      .then((res) => {
        console.log("res: ", res);
        toast.success("Blog added successfully! 🚀");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Error adding blog! 😢");
      });
  };

  const changeHandler = () => {
    setBlog(editor.document);
  };

  return (
    <div className="editor__container">
      <h1>Editor</h1>
      <hr className="editor__break" />
      <hr className="editor__break" />
      <h2 className="blog__subheading">Blog Heading</h2>
      <input
        type="text"
        className="blog__heading_input"
        placeholder="Blog Heading"
        onChange={(e) => setBlogHeading(e.target.value)}
      />
      <h2 className="blog__subheading">Content</h2>
      <BlockNoteView editor={editor} onChange={changeHandler} />
      <button className="blog-submit__button" onClick={submitButtonHandler}>
        Add Blog 🚀
      </button>
      <ToastContainer />
    </div>
  );
};

export default Editor;
