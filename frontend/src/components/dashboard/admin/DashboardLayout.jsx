import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  FaSignOutAlt,
  FaCog,
  FaBoxes,
  FaUsers,
  FaChalkboardTeacher,
  FaChalkboard,
  FaBullhorn,
  FaShip,
  FaLaptopCode,
  FaDollarSign,
} from "react-icons/fa";

const useAuth = () => ({
  user: {
    name: "Admin User",
    roles: ["admin", "superadmin"],
    committees: ["Marketing", "Finance"],
  },
});

// Master list of committees with corresponding icons
const allCommittees = [
  "Advisor/Mentor",
  "Training",
  "Marketing",
  "Export/Import",
  "Website and App handling",
  "Finance",
];

const committeeIcons = {
  "Advisor/Mentor": <FaChalkboardTeacher className="text-gray-500" />,
  Training:        <FaChalkboard      className="text-gray-500" />,  
  Marketing:      <FaBullhorn       className="text-gray-500" />,  
  "Export/Import": <FaShip            className="text-gray-500" />,  
  "Website and App handling": <FaLaptopCode    className="text-gray-500" />,  
  Finance:        <FaDollarSign     className="text-gray-500" />  
};

export const DashboardLayout = () => {
  const [isCommitteeOpen, setCommitteeOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isSuperAdmin = user.roles.includes("superadmin");
  const visibleCommittees = isSuperAdmin
    ? allCommittees
    : allCommittees.filter(c => user.committees.includes(c));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-green-50 text-gray-800">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-green-900 text-white px-6 flex items-center justify-between z-20">
        <h1 className="text-2xl font-bold flex items-center">
          <FaUsers className="mr-2 text-green-300" /> Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Fixed Sidebar */}
        <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r overflow-auto z-10">
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <Link
                  to="products"
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <FaBoxes /> Products
                </Link>
              </li>

              <li className="mb-2">
                <button
                  onClick={() => setCommitteeOpen(o => !o)}
                  className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <span className="flex items-center gap-2">
                    <FaUsers /> Committee
                  </span>
                  {isCommitteeOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {isCommitteeOpen && (
                  <ul className="mt-1">
                    {visibleCommittees.map(cat => (
                      <li key={cat} className="py-2 px-8 hover:bg-gray-100 rounded">
                        <Link
                          to={`committee/${encodeURIComponent(
                            cat.toLowerCase().replace(/\s+/g, "-")
                          )}`}
                          className="flex items-center gap-2"
                        >
                          {committeeIcons[cat]}
                          <span>{cat}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="settings"
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <FaCog /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 mt-16 flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
