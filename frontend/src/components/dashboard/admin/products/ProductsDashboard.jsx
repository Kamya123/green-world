import React from "react";
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
import { FaSeedling } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Card } from "../../../normalComps/DemoCard";

// stub: replace with real auth/context hook
const useAuth = () => ({
  user: {
    name: "Admin User",
    roles: ["admin", "superadmin"],
    committees: ["Marketing", "Finance"],
  },
});

const cropsData = [
  { name: "2016", yield: 20 },
  { name: "2017", yield: 30 },
  { name: "2018", yield: 40 },
  { name: "2019", yield: 35 },
  { name: "2020", yield: 50 },
];

const ProductsDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {["Lettuce", "Spinach", "Coriander", "Basil"].map((crop, i) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {["Yield by Crop", "Fruits vs Crops", "Resync Crops"].map(
          (title, i) => (
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
          )
        )}

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

export default ProductsDashboard;
