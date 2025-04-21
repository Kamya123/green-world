/* src/components/Footer.jsx */
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-6 text-center text-sm">
        <p className="mb-4">© {new Date().getFullYear()} Green World. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms of Service</a>
          <a href="#" className="hover:text-accent">Contact</a>
        </div>
      </div>
    </footer>
  )
}