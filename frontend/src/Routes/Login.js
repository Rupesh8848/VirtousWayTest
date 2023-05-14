import React from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { signInUser } from "../Slices/userSlice";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData((oldData) => ({
      ...oldData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = () => {
    dispatch(signInUser(formData));
    console.log(formData);
  };

  return (
    <>
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Paper elevation={3} className="w-[50vw] py-[4rem]">
          <Box className="flex flex-col justify-center items-center">
            <Typography variant="h4">Welcome back!</Typography>
            <Typography>We're so excited to see you again!</Typography>
          </Box>
          <Stack
            className="flex justify-center items-center py-[2rem]"
            spacing={5}
          >
            <TextField
              variant="standard"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[50%]"
            />
            <TextField
              variant="standard"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-[50%]"
            ></TextField>

            <Button
              variant="contained"
              className="w-[50%]"
              size="large"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Paper>
      </div>
    </>
  );
}
