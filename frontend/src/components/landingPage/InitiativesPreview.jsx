// src/components/landingPage/InitiativesPreview.jsx
import React from "react";
import {
  FaNetworkWired,
  FaBookOpen,
  FaLeaf,
  FaUniversity,
  FaChalkboardTeacher,
  FaRegCalendarAlt,
} from "react-icons/fa";

const initiatives = [
  {
    title: "Farmer Networking",
    Icon: FaNetworkWired,
    description:
      "Connecting farmers and agri-agencies across levels for mutual support and growth.",
  },
  {
    title: "Knowledge Sharing",
    Icon: FaBookOpen,
    description:
      "Preserving traditional knowledge and promoting successful modern practices.",
  },
  {
    title: "Policy Advocacy",
    Icon: FaUniversity,
    description:
      "Advising institutions and influencing agricultural welfare policies.",
  },
  {
    title: "Biodiversity Conservation",
    Icon: FaLeaf,
    description:
      "Collecting, characterizing, and protecting agricultural biodiversity.",
  },
  {
    title: "Education & Research",
    Icon: FaChalkboardTeacher,
    description:
      "Training farmers and collaborating on research and academic initiatives.",
  },
  {
    title: "Meetings & Events",
    Icon: FaRegCalendarAlt,
    description:
      "Organizing in-person and virtual gatherings to discuss challenges and share solutions.",
  },
];

// small card component with icon animation
function InitiativeCard({ title, Icon, description }) {
  return (
    <article
      className="
      group 
      flex flex-col items-center text-center 
      bg-white rounded-lg shadow-md p-6 
      hover:shadow-xl hover:scale-105 
      transform transition duration-300
    "
    >
      {/* icon wrapper */}
      <div
        className="
        transform transition-transform duration-500 
        group-hover:rotate-[20deg]
      "
      >
        <Icon className="text-accent text-5xl mb-4" aria-hidden />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </article>
  );
}

export default function InitiativesPreview() {
  return (
    <section
      id="initiatives"
      className="py-20 bg-white text-gray-800"
      aria-labelledby="initiatives-heading"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-28">
        <h2
          id="initiatives-heading"
          className="text-4xl font-bold text-center text-primary mb-12"
        >
          Our Initiatives
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {initiatives.map((item, idx) => (
            <InitiativeCard
              key={idx}
              title={item.title}
              Icon={item.Icon}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
