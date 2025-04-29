import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const objectives = [
  "To establish and maintain a common network of farmers and all agencies related to agriculture and farmers’ welfare",
  "To organize offline and online meetings of farmers at different levels as and when required",
  "To identify, prioritize and share problems of agriculture and rural life",
  "To collect, analyse and share success stories regarding products and procedures",
  "To collect, preserve and share traditional knowledge of agriculture and rural life",
  "To collect, characterize and preserve biodiversity associated with agriculture",
  "To recommend policies on agriculture and farmers’ welfare to the concerned agencies",
  "To coordinate with relevant organizations and participate in agricultural research",
  "To coordinate with relevant organizations and participate in teaching for all types such as degree, diploma, certified courses, etc.",
  "To coordinate with funding agencies and recommend on formulation of policies",
  "To collaborate with all agencies working directly or indirectly on agriculture and farmers’ welfare",
  "To recognize significant performance or contributions of farmers, academicians, policy makers and supporting agencies, etc.",
];

export default function Vision() {
  return (
    <section id="vision" className="pb-20 w-full bg-white">
      <div className="w-full">
        <h2 className="text-6xl h-52 flex items-center justify-center px-20 bg-primary font-medium text-white mb-6">
          Our Objectives
        </h2>
        <div className="px-40 pt-8">
          <ul className="space-y-4 text-gray-700">
            {objectives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FaRegCheckCircle className="text-accent mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
