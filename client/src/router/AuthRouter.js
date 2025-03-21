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
import Navbar from "../layout/Navbar";
import useAuth from "../aip context/auth/useAuth";
import LandingPage from "../layout/LandingPage";

export default function AuthRouter() {
  const { auth } = useAuth();

  return (
    <Router>
      {!auth.isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {/* Public Route */}

      {auth.isAuthenticated && (
        <div className="h-fill">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/food" element={<Food />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="*" element={<Navigate to="/food" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}
