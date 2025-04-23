// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserFromToken } from '../utils/jwtHelper';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const user = getUserFromToken();

  if (!user) {
    // not logged in or bad token
    return <Navigate to="/login" replace />;
  }
  // optional expiry check
  if (user.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // wrong role
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
