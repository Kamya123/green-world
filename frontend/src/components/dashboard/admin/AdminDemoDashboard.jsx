import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

import { FiPlus } from "react-icons/fi";
import { FaSeedling, FaSignOutAlt } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Card, CardContent } from "../../normalComps/DemoCard";
import { Button } from "../../normalComps/DemoButton";

const cropsData = [
  { name: "2016", yield: 20 },
  { name: "2017", yield: 30 },
  { name: "2018", yield: 40 },
  { name: "2019", yield: 35 },
  { name: "2020", yield: 50 },
];

const AdminDemoDashboard = () => {
    const handleLogout = () => {
        // Clear auth token/localStorage/session (as per your app logic)
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      };
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="bg-green-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌿 ADMIN Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
          <FaSignOutAlt /> Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {['Lettuce', 'Spinach', 'Coriander', 'Basil'].map((crop, i) => (
          <Card key={i} className="bg-white shadow p-4 flex flex-col items-center">
            <FaSeedling className="text-green-500 text-4xl mb-2" />
            <h2 className="font-bold text-lg">{crop}</h2>
            <p className="text-sm text-gray-600">1.2 tons / acre</p>
          </Card>
        ))}

        <Card className="bg-white shadow p-4 flex flex-col items-center col-span-1 md:col-span-1">
          <BsGraphUp className="text-orange-500 text-4xl mb-2" />
          <h2 className="font-bold text-lg">Growth</h2>
          <p className="text-sm text-gray-600">85% Target</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
    </div>
  );
};

export default AdminDemoDashboard;