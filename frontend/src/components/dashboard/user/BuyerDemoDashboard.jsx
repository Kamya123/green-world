// pages/BuyerDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Card, CardContent } from "../../normalComps/DemoCard";
import { Button } from "../../normalComps/DemoButton";

const crops = [
  {
    name: "Lettuce",
    price: "₹25/kg",
    image: "https://images.unsplash.com/photo-1727554492275-c055852ccbc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Spinach",
    price: "₹30/kg",
    image: "https://images.unsplash.com/photo-1665889950448-7d17aa579414?q=80&w=1439&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Coriander",
    price: "₹15/bunch",
    image: "https://images.unsplash.com/photo-1622261208951-9eb43aeefb27?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Basil",
    price: "₹20/bunch",
    image: "https://images.unsplash.com/photo-1662422325326-19089df23d98?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BuyerDemoDashboard = () => {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="bg-green-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🛒 Buyer Dashboard</h1>
        <Button
          className="bg-red-500 flex items-center gap-2 hover:bg-red-600 text-white"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <FaSignOutAlt /> Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {crops.map((crop, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={crop.image} alt={crop.name} className="w-full h-40 object-cover" />
              <CardContent>
                <h2 className="text-lg font-bold mb-1">🌱 {crop.name}</h2>
                <p className="text-green-700 font-semibold">{crop.price}</p>
                <Button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
                  <FaShoppingCart /> Buy Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDemoDashboard;
