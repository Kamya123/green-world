// components/ui/card.js
import React from "react";

export const Card = ({ className = "", children }) => {
  return <div className={`rounded-2xl shadow-md p-4 bg-white ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};