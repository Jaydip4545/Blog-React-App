import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
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
      const { data } = await axios.post("/api/v1/user/login", {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        localStorage.setItem("user", data.id);
        dispatch(authActions.login());
        alert("User LoggedIn Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box className="register">
        <Typography variant="h4" padding={3} textAlign={"center"}>
          Login
        </Typography>

        <TextField
          name="email"
          value={input.email}
          onChange={handleChange}
          placeholder="email"
          margin="normal"
          type="email"
          required
        />
        <TextField
          name="password"
          value={input.password}
          onChange={handleChange}
          placeholder="password"
          margin="normal"
          type="password"
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
        <Button
          type="submit"
          color="primary"
          sx={{ borderRadius: 3, marginTop: 3 }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Not Already Registered? Please Register
        </Button>
      </Box>
    </form>
  );
};

export default Login;
