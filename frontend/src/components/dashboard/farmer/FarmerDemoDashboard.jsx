// FarmerDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../normalComps/card";
import { Button } from "../../normalComps/button";
import { FaSignOutAlt } from "react-icons/fa"

const FarmerDemoDashboard = () => {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="bg-green-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌿 GreenWorld Farmer Dashboard</h1>
        <Button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }} className="bg-red-500 flex items-center gap-2 hover:bg-red-600 text-white"><FaSignOutAlt /> Logout</Button>
      </header>

      <main className="p-6">
        <motion.h2
          className="text-xl font-semibold mb-4 text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Register as a GreenWorld Farmer 🌱
        </motion.h2>

        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input type="text" className="w-full border p-2 rounded-md" placeholder="Enter your full name" />
              </div>

              <div>
                <label className="block font-medium">Land Size (in acres)</label>
                <input type="number" className="w-full border p-2 rounded-md" placeholder="E.g., 5" />
              </div>

              <div>
                <label className="block font-medium">Types of Crops Grown</label>
                <input type="text" className="w-full border p-2 rounded-md" placeholder="E.g., Tomato, Rice" />
              </div>

              <div>
                <label className="block font-medium">Farming Interests</label>
                <select className="w-full border p-2 rounded-md">
                  <option value="">Select interest</option>
                  <option value="organic">Organic Farming</option>
                  <option value="contract">Contract Farming</option>
                  <option value="training">Interested in Training</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Problems Faced</label>
                <textarea className="w-full border p-2 rounded-md" rows="3" placeholder="Write about your farming challenges"></textarea>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full">
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerDemoDashboard;
