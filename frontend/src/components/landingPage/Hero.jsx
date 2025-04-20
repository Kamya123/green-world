/* src/components/Hero.jsx */
import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-5xl font-bold mb-4">
          Green World
        </h1>
        <p className="text-lg max-w-xl mb-6">
          Organic Farming Commerce and Training Platform
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-accent rounded-md font-semibold hover:bg-opacity-90">Get Started</button>
          <button className="px-6 py-3 border border-white rounded-md font-semibold hover:bg-accent hover:text-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}