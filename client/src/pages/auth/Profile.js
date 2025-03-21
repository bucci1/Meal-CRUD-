import { Box, Button, TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useState, useEffect } from "react";
import useAuth from "../../aip context/auth/useAuth";
import { updateProfile } from "../../api/auth";
import useMsg from "../../aip context/alert/useMsg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { auth, authDispatch } = useAuth();
  const { msgDispatch } = useMsg();
  const [userData, setUserData] = useState({
    email: auth.u_email,  // Fixed typo here
    name: auth.u_name,
    calorie: auth.calorie,
    password: "",
    password_confirm: "",
    oldPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // If auth data changes, update userData state (useful for session refresh)
    setUserData({
      email: auth.u_email,
      name: auth.u_name,
      calorie: auth.calorie,
      password: "",
      password_confirm: "",
      oldPassword: "",
    });
  }, [auth]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    // Ensure passwords match before updating
    if (userData.password !== userData.password_confirm) {
      msgDispatch("error", "Passwords do not match.");
      return;
    }

    // Call the updateProfile function
    updateProfile(userData, authDispatch, msgDispatch);
  };

  return (
    <Box className="container h-fill">
      <Box className="auth-card">
        <Box className="title mb-3">Profile</Box>

        <TextField
          label="Email"
          className="w-100 mb-5"
          value={userData.email}
          disabled
        />

        <TextField
          label="Old Password"
          type="password"
          className="w-100 mb-5"
          name="oldPassword"
          value={userData.oldPassword}
          onChange={handleChange}
        />

        <Box className="container">
          <Box>
            <TextField
              label="Name"
              className="mb-5 mr-1"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <TextField
              label="Calorie"
              type="number"
              className="mb-5 ml-1"
              name="calorie"
              value={userData.calorie}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              label="Password"
              type="password"
              className="mb-5 mr-1"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              className="mb-5 ml-1"
              name="password_confirm"
              value={userData.password_confirm}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <ButtonGroup disableElevation variant="contained" color="success" className="w-100">
          <Button color="success" className="w-50" size="large" onClick={handleUpdate}>
            Save
          </Button>
          <Button color="error" className="w-50" size="large" onClick={() => navigate("/meal")}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
