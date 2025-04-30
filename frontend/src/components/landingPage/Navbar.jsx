// // src/components/landingPage/Navbar.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import LogoImg from '../../assets/images/logo.png';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md tracking-wider">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
//           <img src={LogoImg} alt="GreenWorld" className="w-10 h-10" />
//           <div className="leading-none">
//             <h3 className="font-roboto">GreenWorld</h3>
//           </div>
//         </Link>

//         {/* Hamburger on mobile */}
//         <button
//           className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle Menu"
//         >
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         {/* Links */}
//         <div className={`flex-col md:flex-row md:flex items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6
//                          bg-white md:bg-transparent p-4 md:p-0 absolute md:static top-full left-0 right-0
//                          transition-transform duration-200
//                          ${open ? 'translate-y-0' : '-translate-y-full'} md:translate-y-0`}
//         >
//           <a href="#features" className="hover:text-primary">Features</a>
//           <a href="#products" className="hover:text-primary">Products</a>
//           <Link to="/login" className="hover:text-primary">Login</Link>
//           <Link to="/signup" className="hover:text-primary">Sign Up</Link>
//           <Link
//             to="/signup"
//             className="inline-block px-5 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90"
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }


// src/components/landingPage/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoImg from '../../assets/images/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-8 left-0 right-0 z-40 bg-white shadow-md tracking-wider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-28 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img src={LogoImg} alt="GreenWorld" className="w-10 h-10" />
          <div className="leading-none">
            <h3 className="font-roboto">GreenWorld</h3>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#products" className="hover:text-primary">Products</a>
          <Link to="/login" className="hover:text-primary">Login</Link>
          <Link to="/signup" className="hover:text-primary">Sign Up</Link>
          <Link to="/signup" className="inline-block px-5 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-primary p-2" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div className={`fixed top-8 right-0 h-full w-1/2 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-gray-700" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#features" onClick={() => setOpen(false)} className="hover:text-primary">Features</a>
          <a href="#products" onClick={() => setOpen(false)} className="hover:text-primary">Products</a>
          <Link to="/login" onClick={() => setOpen(false)} className="hover:text-primary">Login</Link>
          <Link to="/signup" onClick={() => setOpen(false)} className="hover:text-primary">Sign Up</Link>
          <Link to="/signup" onClick={() => setOpen(false)} className="place-self-start px-5 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90">
            Get Started
          </Link>
        </nav>
      </div>
    </nav>
  );
}