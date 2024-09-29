import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-10 py-4 bg-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            alt="TheraWell Logo"
            className="h-10 mr-4"
          />
          <span className="font-bold text-xl text-blue-900">TheraWell</span>
        </div>
        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-12">
          <li>
            <a
              href="/"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/aboutus"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/catalog"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative"
            >
              Find Doctor
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/userprofile"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative"
            >
              Profile
            </a>
          </li>
        </ul>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a
                href="/"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutus"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/catalog"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Doctor
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/userprofile"
                className="text-blue-900 hover:text-blue-600 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
