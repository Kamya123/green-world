// src/pages/LandingPage.jsx
import React, { Suspense, lazy } from 'react';

const ContactBar     = lazy(() => import('../components/landingPage/ContactBar'));
const Navbar         = lazy(() => import('../components/landingPage/Navbar'));
const Hero           = lazy(() => import('../components/landingPage/Hero'));
const FeatureSection = lazy(() => import('../components/landingPage/FeatureSection'));
const ProductsPreview= lazy(() => import('../components/landingPage/ProductsPreview'));
const Footer         = lazy(() => import('../components/landingPage/Footer'));

export default function LandingPage() {
  return (
    <div className="text-gray-800">
      <Suspense fallback={<div className="h-10 bg-gray-100 animate-pulse" />}>
        <ContactBar />
      </Suspense>
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div className="h-screen bg-gray-200 animate-pulse" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-white animate-pulse" />}>
        <FeatureSection />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-white animate-pulse" />}>
        <ProductsPreview />
      </Suspense>
      <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
