import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#FFFAE9]">
      <nav className="flex justify-between items-center mx-auto px-6 py-4 md:px-10">
        <div className="flex items-center">
          <img
            className="w-32 cursor-pointer"
            src="/images/logo.svg"
            alt="Logo"
          />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          >
            {menuOpen ? (
              <i className="fas fa-times "></i>
            ) : (
              <i className="fas fa-bars "></i>
            )}
          </button>
        </div>
        <ul className={`md:flex md:items-center hidden space-x-3`}>
          <li>
            <a
              className="text-gray-800 text-lg hover:text-gray-500 pr-2"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-gray-800  text-lg hover:text-gray-500 pr-2"
              href="#"
            >
              About us
            </a>
          </li>
          <li>
            <a
              className="text-gray-800 text-lg hover:text-gray-500 pr-2"
              href="#"
            >
              Renters
            </a>
          </li>
          <li>
            <a
              className="text-gray-800 text-lg hover:text-gray-500 pr-2"
              href="#"
            >
              Homeowners
            </a>
          </li>
          <li>
            <a
              className="text-gray-800 text-lg hover:text-gray-500 pr-2"
              href="#"
            >
              Reviews
            </a>
          </li>
        </ul>
        <div className="md:flex md:items-center hidden space-x-4">
          <Button buttonText="Register" />
        </div>
      </nav>
      {menuOpen && (
        <ul className="md:hidden space-y-4 py-4 px-4 absolute top-16 left-0 w-full bg-white z-10 transition-all duration-300 ease-in-out">
          <li>
            <a className="block text-gray-800 hover:text-gray-500" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="block text-gray-800 hover:text-gray-500" href="#">
              About us
            </a>
          </li>
          <li>
            <a className="block text-gray-800 hover:text-gray-500" href="#">
              Renters
            </a>
          </li>
          <li>
            <a className="block text-gray-800 hover:text-gray-500" href="#">
              Homeowners
            </a>
          </li>
          <li>
            <a className="block text-gray-800 hover:text-gray-500" href="#">
              Reviews
            </a>
          </li>
          <li>
            <Button buttonText="Register" />
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
