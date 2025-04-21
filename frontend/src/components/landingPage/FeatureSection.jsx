/* src/components/landingPage/FeatureSection.jsx */
import React from 'react'
import organicFarmImg from '../../assets/images/organic-farm.jpg'
import bgPattern  from '../../assets/images/3-Photoroom.jpg'  // ← your bg image

export default function FeatureSection() {
  return (
    <section id="features" className="pt-20 pb-14 bg-gray-50">
      <div className="container mx-auto px-28 md:flex md:items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          {/* wrapper: relative so its children can absolutely position */}
          <div className="relative inline-block left-8">
            {/* bg‐pattern: absolute behind the main img */}
            <div
              className="
                absolute
                -top-20      /* 1rem above the img */
                -right-16  /* 1rem beyond the right edge */
                -bottom-20  /* 1rem below */
                 left-14  /* 1rem inside from the left edge */
                bg-cover bg-center
              "
              style={{ backgroundImage: `url(${bgPattern})` }}
            />
            {/* your main image must be “relative” so it layers above */}
            <img
              src={organicFarmImg}
              alt="Organic Farming"
              className="relative shadow-lg h-[25rem] w-auto"
            />
          </div>
        </div>

        <div className="md:w-1/2 md:pl-12 relative -left-8">
          <h2 className="text-3xl font-bold text-primary mb-4 ">Our Mission</h2>
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
  )
}
