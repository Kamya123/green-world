import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../../normalComps/DemoCard";
import { Button } from "../../../normalComps/DemoButton";
import {
  FaUserPlus,
  FaSort,
  FaHashtag,
  FaIdBadge,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

// helper: turn "advisor-mentor" → "Advisor/Mentor"
const prettify = (slug) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const CommitteeDashboard = () => {
  const { subcat } = useParams();            // e.g. "advisor-mentor"
  const label = prettify(subcat);            // → "Advisor Mentor"
  const title = `Add New ${label.startsWith("/") ? label : label} Employee`; 

  const [employees, setEmployees] = useState([]);
  const [form, setForm]         = useState({ name: "", email: "", phone: "" });
  const [search, setSearch]     = useState("");
  const [sortKey, setSortKey]   = useState("name");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (form.name && form.email && form.phone) {
      setEmployees([
        ...employees,
        { id: `DPT-${employees.length + 1}`, ...form },
      ]);
      setForm({ name: "", email: "", phone: "" });
    }
  };

  const sortedEmployees = employees
    .filter((emp) =>
      `${emp.name} ${emp.email} ${emp.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  return (
    <div className="p-6 space-y-6">
      {/* Dynamic Form Title */}
      <Card className="bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-700 flex items-center">
          <FaUsers className="mr-2 text-green-600" />
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center border rounded-md p-2 space-x-2">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded-md p-2 space-x-2">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded-md p-2 space-x-2">
            <FaPhone className="text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="bg-green-600 text-white hover:bg-green-700 flex items-center justify-center"
        >
          <FaUserPlus className="mr-2" /> {title}
        </Button>
      </Card>

      {/* Sort & Search Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaSort className="text-gray-600" />
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        <div className="relative mt-2 md:mt-0 w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${label}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 p-2 border rounded-md w-full focus:outline-green-600"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-x-auto shadow">
        <table className="min-w-full bg-white text-sm rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white text-left">
            <tr>
              <th className="px-4 py-3 w-40">
                <FaHashtag className="inline mr-1" />
                Sl. No.
              </th>
              <th className="px-4 py-3">
                <FaIdBadge className="inline mr-1" />
                Dept ID
              </th>
              <th className="px-4 py-3">
                <FaUser className="inline mr-1" />
                Name
              </th>
              <th className="px-4 py-3">
                <FaEnvelope className="inline mr-1" />
                Email
              </th>
              <th className="px-4 py-3">
                <FaPhone className="inline mr-1" />
                Phone
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{emp.id}</td>
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500"
                  colSpan={5}
                >
                  No {label} added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CommitteeDashboard;
