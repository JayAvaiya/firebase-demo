import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { BlogContext } from "../context/BlogContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddBlog = () => {
  const { addBlog, getBlogs, result } = useContext(BlogContext);
  useEffect(() => {
    getBlogs(1);
  }, []);

  console.log(result);

  const [data, setData] = useState({
    title: "",
    technology: "",
  });
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", marginTop: "5ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          label="Blog Title"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          onChange={(e) => setData({ ...data, technology: e.target.value })}
          label="Descriptions"
          variant="filled"
        />
        <Button
          variant="outlined"
          onClick={(e) => addBlog({ title: data.title, technology: data.technology, userId: 2 })}
        >
          Submit
        </Button>
      </Box>
      {result.map((item) => (
        <div>
          <h1>{item.title}</h1>
          <div>{item.technology}</div>
        </div>
      ))}
    </>
  );
};

export default AddBlog;
