import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaTags, FaUsers, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <div className="text-2xl font-bold mb-8 text-blue-600">GreenWorld</div>
      <ul className="space-y-4 text-gray-700">
        <li><Link to="#" className="flex items-center gap-2"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="#" className="flex items-center gap-2"><FaBoxOpen /> Products</Link></li>
        <li><Link to="#" className="flex items-center gap-2"><FaTags /> Categories</Link></li>
        <li><Link to="#" className="flex items-center gap-2"><FaUsers /> Users</Link></li>
        <li><Link to="#" className="flex items-center gap-2"><FaCog /> Settings</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
