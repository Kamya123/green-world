/* src/components/landingPage/Navbar.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/images/logo.png'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md tracking-wider">
      <div className="container mx-auto px-28 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex gap-1 font-times items-center justify-center">
          <img src={LogoImg} loading="lazy" alt="GreenWorld" width={40} height={40} />
          <div className="flex flex-col">
            <h3 className='leading-none font-roboto'>GreenWorld</h3>
            {/* <p className='text-xs text-accent'>Farmers' Forum</p> */}
          </div>
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#products" className="hover:text-primary">Products</a>
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