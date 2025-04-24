// //src/pages/dashboards/AdminDashboard.jsx

// import React from "react";
// import AdminSidebar from "../../components/dashboard/admin/AdminSidebar";
// import AdminDashboardHome from "../../components/dashboard/admin/AdminDashboardHome";

// const AdminDashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       Sidebar
//       <AdminSidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <AdminDashboardHome />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


//src/pages/dashboards/AdminDashboard.jsx

import React from "react";
import AdminSidebar from "../../components/dashboard/admin/AdminSidebar";
import AdminDashboardHome from "../../components/dashboard/admin/AdminDashboardHome";
import AdminDemoDashboard from "../../components/dashboard/admin/AdminDemoDashboard";

const AdminDashboard = () => {
  return (
    <div className="h-screen bg-gray-100">
      <AdminDemoDashboard />
    </div>
  );
};

export default AdminDashboard;

