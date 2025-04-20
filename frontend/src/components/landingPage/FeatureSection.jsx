/* src/components/landingPage/FeatureSection.jsx */
import React from 'react';

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:flex md:items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src="/images/feature.jpg" alt="Organic Farming" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="mb-6">
            Green World connects buyers directly with trained farmers, sells fresh organic produce, and provides educational resources to help farmers transition to sustainable methods.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Direct marketplace for farm products</li>
            <li>Farmer training and support</li>
            <li>Year-round order tracking</li>
            <li>Community-driven agricultural education</li>
          </ul>
        </div>
      </div>
    </section>
  );
}