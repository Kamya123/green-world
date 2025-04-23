//src/pages/dashboards/AdminDashboard.jsx

import React from "react";
import AdminSidebar from "../../components/dashboard/admin/AdminSidebar";
import AdminDashboardHome from "../../components/dashboard/admin/AdminDashboardHome";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <AdminDashboardHome />
      </div>
    </div>
  );
};

export default AdminDashboard;
