import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import React from "react";
  import Login from "../pages/auth/Login";
  import Register from "../pages/auth/Register";
  import Profile from "../pages/auth/Profile";
  import Food from "../pages/food/Food";
  import Meal from "../pages/meal/Meal";
  import useAuth from "../aip context/auth/useAuth";
  import PrivateRoute from "./PrivateRoute";
  
  export default function MainRouter() {
    const { auth } = useAuth();
    return (
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
  
          {/* Protected Routes */}
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/food" element={<Food />} />
            <Route path="/meal" element={<Meal />} />
          {/* </Route> */}
  
          {/* Other public routes */}
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Router>
    );
  }
  