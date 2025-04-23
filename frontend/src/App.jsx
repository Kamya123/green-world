import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import OTPVerification from "./pages/auth/OtpVerification";

import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTPVerification />} />

        {/* Buyer */}
        <Route element={<ProtectedRoute allowedRoles={["buyer"]} />}>
          <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        </Route>

        {/* Farmer */}
        <Route element={<ProtectedRoute allowedRoles={["farmer"]} />}>
          <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
