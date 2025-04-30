import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaSeedling, FaSignOutAlt, FaCog, FaBoxes } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Card } from "../../normalComps/DemoCard";
import { Button } from "../../normalComps/DemoButton";

// stub: replace with real auth/context hook
const useAuth = () => {
  // In real use, fetch user and roles/committees from context or API
  return {
    user: {
      name: "Admin User",
      roles: ["admin", "superadmin"], // or ["admin"]
      committees: ["Marketing", "Finance"], // committees user belongs to
    },
  };
};

const cropsData = [
  { name: "2016", yield: 20 },
  { name: "2017", yield: 30 },
  { name: "2018", yield: 40 },
  { name: "2019", yield: 35 },
  { name: "2020", yield: 50 },
];

// Layout with common navbar and sidebar
const DashboardLayout = ({ children }) => {
  const [isCommitteeOpen, setCommitteeOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const allCommittees = [
    "Advisor/Mentor",
    "Training",
    "Marketing",
    "Export/Import",
    "Website and App handling",
    "Finance",
  ];
  const isSuperAdmin = user.roles.includes("superadmin");
  const visibleCommittees =
    isSuperAdmin || user.committees.length === 0
      ? allCommittees
      : allCommittees.filter((c) => user.committees.includes(c));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleCommittee = () => setCommitteeOpen((open) => !open);

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-gray-800">
      {/* Top Navbar */}
      <header className="bg-green-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌿 Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.name}</span>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/products"
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <FaBoxes /> Products
                </Link>
              </li>
              <li className="mb-2">
                <button
                  onClick={toggleCommittee}
                  className="w-full flex justify-between items-center py-2 px-4 hover:bg-gray-100 rounded"
                >
                  Committee
                  {isCommitteeOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {isCommitteeOpen && (
                  <ul className="mt-1">
                    {visibleCommittees.map((cat) => (
                      <li key={cat} className="py-2 px-8 hover:bg-gray-100 rounded">
                        <Link to={`/dashboard/admin/committee/${encodeURIComponent(
                          cat.toLowerCase().replace(/\s+/g, "-")
                        )}`}>{cat}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/dashboard/admin/settings"
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <FaCog /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      {/* Replace this with Routes or dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Lettuce', 'Spinach', 'Coriander', 'Basil'].map((crop, i) => (
          <Card
            key={i}
            className="bg-white shadow p-4 flex flex-col items-center"
          >
            <FaSeedling className="text-green-500 text-4xl mb-2" />
            <h2 className="font-bold text-lg">{crop}</h2>
            <p className="text-sm text-gray-600">1.2 tons / acre</p>
          </Card>
        ))}

        <Card className="bg-white shadow p-4 flex flex-col items-center">
          <BsGraphUp className="text-orange-500 text-4xl mb-2" />
          <h2 className="font-bold text-lg">Growth</h2>
          <p className="text-sm text-gray-600">85% Target</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {['Yield by Crop', 'Fruits vs Crops', 'Resync Crops'].map((title, i) => (
          <Card key={i} className="bg-white shadow p-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cropsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        ))}

        <Card className="bg-white shadow p-4">
          <h3 className="font-semibold mb-2">Fast Crops</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cropsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="yield" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
