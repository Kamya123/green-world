import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Vision from "./components/landingPage/Vision";

import ProtectedRoute from "./routes/ProtectedRoute";

import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import OTPVerification from "./pages/auth/OtpVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyForgotOTP from "./pages/auth/VerifyForgotOTP";
import ResetPassword from "./pages/auth/ResetPassword";

import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import OthersDashboard from "./components/dashboard/others/OthersDashboard";

import CommitteeDashboard from "./components/dashboard/admin/committee/CommitteeDashboard";
import ProductsDashboard from "./components/dashboard/admin/products/ProductsDashboard";
import SettingsPage from "./components/dashboard/admin/settings/SettingsPage";

import AdminDashboard from "./pages/dashboards/AdminDashboard"; // This is now just layout wrapper
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-forgot-otp" element={<VerifyForgotOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/our-vision" element={<Vision />} />

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
          <Route path="/dashboard/admin" element={<AdminDashboard />}>
            <Route index element={<ProductsDashboard />} />
            <Route path="products" element={<ProductsDashboard />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="committee/:subcat" element={<CommitteeDashboard />} />
          </Route>
        </Route>

        {/* Others */}
        <Route element={<ProtectedRoute allowedRoles={["others"]} />}>
          <Route path="/dashboard/others" element={<OthersDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
