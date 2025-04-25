/* src/components/landingPage/Hero.jsx */
import React from 'react';
import LazyBg from './LazyBg';
// import your image file
import farmImage from '../../assets/images/farm-1.jpg';
import { Link } from 'react-router-dom'; // Correct import for Link

export default function Hero() {
  return (
    <LazyBg
      src={farmImage}
      className="relative h-screen bg-cover bg-center tracking-wider"
      style={{ height: 'calc(100vh - 5rem)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 container mx-auto px-28 h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold mb-4">
          Green World Farmers' Forum
        </h1>
        <p className="text-lg max-w-xl mb-6 tracking-widest">
          For Education and Development
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <button className="px-6 py-3 bg-accent rounded-md font-semibold hover:bg-opacity-90">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-3 border border-white rounded-md font-semibold hover:bg-accent hover:text-white">
            Learn More
          </button>
        </div>
      </div>
    </LazyBg>
  );
}
