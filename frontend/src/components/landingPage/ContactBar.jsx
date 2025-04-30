/* src/components/landingPage/ContactBar.jsx */
import React from 'react';

export default function ContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-primary text-white text-sm flex items-center justify-center md:justify-end space-x-4 md:space-x-6 px-4 sm:px-6 lg:px-28">
      <span>📞 +91 98324 54504</span>
      <span>✉️ info@greenworld.com</span>
    </div>
  );
}