import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const UpdateBlog = () => {
  const { id } = useParams();
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
  const getBlog = async () => {
    const { data } = await axios.get("/api/v1/blog/get-blog/" + id);
    const temp = {
      title: data.blog.title,
      image: data.blog.image,
      content: data.blog.content,
    };
    setInput(temp);
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/blog/update-blog/" + id, {
        user: localStorage.getItem("user"),
        title: input.title,
        image: input.image,
        content: input.content,
      });
      if (data.success) {
        dispatch(authActions.login());
        alert("Blog Updated SuccessFully");
        navigate("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("here");
    getBlog();
  }, []);
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
          value={input.content}
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

export default UpdateBlog;
