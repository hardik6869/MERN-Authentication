import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setupSinupUser } from "../utils/apiPaths";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(setupSinupUser, inputs)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then(() => navigate("/login"));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        marginLeft="auto"
        marginRight="auto"
        width={300}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" color="initial">
          Signup
        </Typography>
        <TextField
          name="name"
          value={inputs.name}
          variant="outlined"
          placeholder="Name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="email"
          type="email"
          value={inputs.email}
          variant="outlined"
          placeholder="Email"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="password"
          type="password"
          value={inputs.password}
          variant="outlined"
          placeholder="Password"
          margin="normal"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Signup
        </Button>
      </Box>
    </form>
  );
};

export default Signup;
