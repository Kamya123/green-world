/* src/pages/LandingPage.jsx */
import React from 'react';
import ContactBar from '../components/landingPage/ContactBar';
import Navbar from '../components/landingPage/Navbar';
import Hero from '../components/landingPage/Hero';
import FeatureSection from '../components/landingPage/FeatureSection';
import ProductsPreview from '../components/landingPage/ProductsPreview';
import Footer from '../components/landingPage/Footer';

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      <ContactBar />
      <Navbar />
      <Hero />
      <FeatureSection />
      <ProductsPreview />
      <Footer />
    </div>
  );
}