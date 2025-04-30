// src/components/landingPage/FeatureSection.jsx
import React from "react";
import organicFarmImg from "../../assets/images/organic-farm.jpg";
import bgPattern from "../../assets/images/3-Photoroom.jpg";
import { FaRegCheckCircle } from "react-icons/fa";
import LazyBg from "./LazyBg";

export default function FeatureSection() {
  return (
    <section id="features" className="pt-20 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 flex flex-col gap-12 items-center md:flex-row md:items-center md:gap-16">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <div className="relative inline-block md:left-8">
            <LazyBg
              src={bgPattern}
              className="absolute -top-20 -right-16 -bottom-20 left-14 bg-cover bg-center"
            />
            <img
              src={organicFarmImg}
              loading="lazy"
              alt="Organic Farming"
              className="relative shadow-lg h-[25rem] w-auto"
            />
          </div>
        </div>
        <div className="w-full px-12 md:w-1/2 md:pl-12 relative md:-left-8 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="mb-6">
            Green World connects buyers directly with trained farmers, sells
            fresh organic produce, and provides educational resources to help
            farmers transition to sustainable methods.
          </p>
          <ul className="list-disc pl-1 space-y-2 text-gray-700">
            <li className="flex items-center gap-3">
              <FaRegCheckCircle className="text-accent" />
              Direct marketplace for farm products
            </li>
            <li className="flex items-center gap-3">
              <FaRegCheckCircle className="text-accent" />
              Farmer training and support
            </li>
            <li className="flex items-center gap-3">
              <FaRegCheckCircle className="text-accent" />
              Year-round order tracking
            </li>
            <li className="flex items-center gap-3">
              <FaRegCheckCircle className="text-accent" />
              Community-driven agricultural education
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
