import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: input.name,
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        alert("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box className="register">
        <Typography variant="h4" padding={3} textAlign={"center"}>
          Register
        </Typography>
        <TextField
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="name"
          margin="normal"
          type="text"
          required
        />
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
          Already Registered? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
