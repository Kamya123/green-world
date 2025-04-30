// src/components/landingPage/Hero.jsx
import React from "react";
import LazyBg from "./LazyBg";
import farmImage from "../../assets/images/farm-1.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <LazyBg
      src={farmImage}
      className="relative bg-cover bg-center tracking-wider"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 flex flex-col justify-center items-center sm:items-center text-center sm:text-center min-h-[calc(100vh-5rem)] text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Green World Farmers' Forum</h1>
        <p className="text-base sm:text-lg max-w-xl mb-6 tracking-widest">
          For Education and Development
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <button className="px-6 py-3 bg-accent rounded-md font-semibold hover:bg-opacity-90">
              Get Started
            </button>
          </Link>
          <Link to="/our-vision">
            <button className="px-6 py-3 border border-white rounded-md font-bold hover:bg-accent hover:text-white">
              Our Vision →
            </button>
          </Link>
        </div>
      </div>
    </LazyBg>
  );
}
