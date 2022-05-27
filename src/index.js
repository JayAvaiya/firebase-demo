import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BlogContextProvider from "./context/BlogContext";
import UserContextProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BlogContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BlogContextProvider>
  </React.StrictMode>
);
