import React from "react";

const cards = [
  { title: "Orders Received", value: 356, change: "+10%", color: "green" },
  { title: "Average Daily Sales", value: "$5680", change: "+30%", color: "purple" },
  { title: "New Customers", value: "5.8K", change: "+13%", color: "blue" },
  { title: "Pending Orders", value: 580, change: "-10%", color: "orange" },
];

const AdminDashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white shadow-md p-4 rounded-lg border-l-4 border-${card.color}-500`}
          >
            <h2 className="text-gray-500">{card.title}</h2>
            <p className="text-xl font-bold">{card.value}</p>
            <p className={`text-sm text-${card.color}-500`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for Sales Graph */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">[Sales Graph Here]</div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
