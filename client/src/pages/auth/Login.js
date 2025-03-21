import { Box, Button, Link, TextField } from "@mui/material";
import React, { useState, useCallback, useMemo } from "react";
import "./auth.css";
import useAuth from "../../aip context/auth/useAuth";
import { authLogin } from "../../api/auth";
import useMsg from "../../aip context/alert/useMsg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { auth, authDispatch } = useAuth();
  const { msgDispatch } = useMsg();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData]
  );

  const handleLogin = useCallback(() => {
    if (loginData.email !== "" && loginData.password !== "") {
      authLogin(loginData, authDispatch, msgDispatch);
    }
  }, [loginData, authDispatch, msgDispatch]);

  // UseEffect to handle redirect when user is authenticated
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/food");
    }
  }, [auth, navigate]);

  const handleBlur = (field) => {
    if (!loginData[field].trim()) {
      setError((prevError) => ({
        ...prevError,
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [field]: "",
      }));
    }
  };

  return (
    <Box className="container h-fill">
      <Box className="auth-card ">
        <Box className="title mb-3">Meal</Box>

        {/* Email Input */}
        <TextField
          label="Email"
          className="w-100 mb-5"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          error={!!error.email}
          helperText={error.email}
        />

        {/* Password Input */}
        <TextField
          type="password"
          label="Password"
          className="w-100 mb-5"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={!!error.password}
          helperText={error.password}
        />

        <Button
          variant="contained"
          color="success"
          size="large"
          className="w-100 mb-2"
          onClick={handleLogin}
        >
          Sign in
        </Button>

        <Link
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </Link>
      </Box>
    </Box>
  );
}
