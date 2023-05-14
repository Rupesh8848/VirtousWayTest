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
import { signUpUser } from "../Slices/userSlice";

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData((oldData) => ({
      ...oldData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUp = async () => {
    dispatch(signUpUser(formData));
  };

  return (
    <>
      <div className="w-full h-[80vh] flex justify-center items-center mt-[1rem]">
        <Paper elevation={3} className="w-[50vw] py-[2rem]">
          <Box className="flex flex-col justify-center items-center">
            <Typography variant="h4">Create an Account</Typography>
          </Box>
          <Stack
            className="flex justify-center items-center py-[2rem]"
            spacing={3}
          >
            <TextField
              variant="standard"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-[50%]"
            />
            <TextField
              variant="standard"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-[50%]"
            />
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
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Stack>
        </Paper>
      </div>
    </>
  );
}
