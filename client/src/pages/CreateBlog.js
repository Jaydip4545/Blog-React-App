import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        user: localStorage.getItem("user"),
        title: input.title,
        image: input.image,
        content: input.content,
      });
      if (data.success) {
        dispatch(authActions.login());
        alert("New Blog Created SuccessFully");
        navigate("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box className="register">
        <Typography variant="h4" padding={3} textAlign={"center"}>
          Blog
        </Typography>

        <TextField
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Title"
          margin="normal"
          type="text"
          required
        />
        <TextField
          name="image"
          value={input.image}
          onChange={handleChange}
          placeholder="Image URL"
          margin="normal"
          type="URL"
          required
        />
        <textarea
          rows={10}
          cols={50}
          name="content"
          value={input.password}
          onChange={handleChange}
          placeholder="content"
          margin="normal"
          type="paragraph"
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
