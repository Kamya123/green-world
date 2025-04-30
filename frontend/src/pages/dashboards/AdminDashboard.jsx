 //src/pages/dashboards/AdminDashboard.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/admin/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard;


