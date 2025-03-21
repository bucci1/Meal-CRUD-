import { Box, Button, Link, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { authRegister } from "../../api/auth";
import useMsg from "../../aip context/alert/useMsg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { msg, msgDispatch } = useMsg();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e) => {
    validateInput();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = () => {
    let formErrors = {};

    // Validate form fields
    if (!userData.name) formErrors.name = "Name is required";
    if (!userData.email) formErrors.email = "Email is required";
    if (!userData.password) formErrors.password = "Password is required";
    if (userData.password !== userData.password_confirm)
      formErrors.password_confirm = "Passwords do not match";

    // If there are any errors, set them and don't proceed with registration
    console.log(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  };

  const handleRegister = () => {
    validateInput();
    // Otherwise, proceed with registration
    authRegister({ user: userData }, msgDispatch);
  };

  useEffect(() => {
    if (msg.type === "success") {
      navigate("/login");
    }
  }, [msg.type]);

  return (
    <Box className="container h-fill">
      <Box className="auth-card">
        <Box className="title mb-3">Sign Up</Box>

        {/* Name Input */}
        <TextField
          label="Name"
          className="w-100 mb-5"
          name="name"
          value={userData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Email Input */}
        <TextField
          label="Email"
          className="w-100 mb-5"
          name="email"
          value={userData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Password Input */}
        <TextField
          type="password"
          label="Password"
          className="w-100 mb-5"
          name="password"
          value={userData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        {/* Confirm Password Input */}
        <TextField
          type="password"
          label="Confirm"
          className="w-100 mb-5"
          name="password_confirm"
          value={userData.password_confirm}
          onChange={handleChange}
          error={!!errors.password_confirm}
          helperText={errors.password_confirm}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="success"
          size="large"
          className="w-100 mb-2 mt-1"
          onClick={handleRegister}
        >
          Sign Up
        </Button>

        {/* Sign-in Link */}
        <Link
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </Link>
      </Box>
    </Box>
  );
}
