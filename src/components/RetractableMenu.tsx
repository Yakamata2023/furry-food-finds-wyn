import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Info, Phone, Gamepad2, User, Menu } from 'lucide-react';

const RetractableMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 bg-white rounded-full shadow-lg p-2 z-50 md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMenu}>
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="bg-wynGreen-50 border-b border-wynGreen-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">WYN Remnants</h2>
            </div>

            <nav className="px-6 py-4 space-y-4">
              <Link
                to="/"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-wynGreen-50 transition-colors"
                onClick={toggleMenu}
              >
                <Home className="w-5 h-5 text-wynGreen-600" />
                <span className="text-gray-700">Home</span>
              </Link>

              <Link
                to="/donate"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-wynOrange-50 transition-colors"
                onClick={toggleMenu}
              >
                <Heart className="w-5 h-5 text-wynOrange-600" />
                <span className="text-gray-700">💝 Donate</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-wynGreen-50 transition-colors"
                onClick={toggleMenu}
              >
                <Info className="w-5 h-5 text-wynGreen-600" />
                <span className="text-gray-700">About Us</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-wynGreen-50 transition-colors"
                onClick={toggleMenu}
              >
                <Phone className="w-5 h-5 text-wynGreen-600" />
                <span className="text-gray-700">Contact</span>
              </Link>

              <Link
                to="/game"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={toggleMenu}
              >
                <Gamepad2 className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">🎮 WYN Runner Game</span>
              </Link>

              <Link
                to="/auth"
                className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-wynGreen-50 transition-colors"
                onClick={toggleMenu}
              >
                <User className="w-5 h-5 text-wynGreen-600" />
                <span className="text-gray-700">Sign In / Sign Up</span>
              </Link>
            </nav>

            <div className="absolute bottom-0 left-0 w-full p-4 text-center text-gray-500">
              <p className="text-xs">
                &copy; {new Date().getFullYear()} WYN Remnants. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RetractableMenu;
