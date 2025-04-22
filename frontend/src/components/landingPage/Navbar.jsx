/* src/components/landingPage/Navbar.jsx */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md tracking-wider">
      <div className="container mx-auto px-28 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          GreenWorld
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="#features" className="hover:text-primary">Features</Link>
          <Link to="#products" className="hover:text-primary">Products</Link>
          <Link to="/login" className="hover:text-primary">Login</Link>
          <Link to="/signup" className="hover:text-primary">Sign Up</Link>
        </div>
        <Link
          to="/signup"
          className="hidden md:inline-block px-5 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}