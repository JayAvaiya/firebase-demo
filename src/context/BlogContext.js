import React, { createContext, useState } from "react";
import { set, ref, get, onValue } from "firebase/database";
import { database } from "../firebase";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const [result, setResult] = useState({});
  const addBlog = ({ title, technology, userId }) => {
    set(ref(database, `blog/${userId}`), {
      title,
      technology,
    });
  };

  const getBlogs = (blogId) => {
    const blogRef = ref(database, `blog/`);
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      setResult(data);
    });
  };
  const value = { addBlog, getBlogs, result };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
