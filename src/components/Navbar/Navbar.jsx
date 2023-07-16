import React, { useState } from "react";
import Button from "./Button";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#FFFAE9]">
      <nav className="flex justify-between items-center mx-auto px-6 py-4 md:px-6">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-32 cursor-pointer"
              src="/images/Logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
          >
            {menuOpen ? (
              <i className="fas fa-times" />
            ) : (
              <i className="fas fa-bars" />
            )}
          </button>
        </div>

        <ul className={`md:flex md:items-center hidden space-x-3`}>
          <NavLink to="/">
            <li className="text-gray-800 text-lg hover:text-gray-500 pr-4">
              Home
            </li>
          </NavLink>
          <NavLink to="/property-search">
            <li className="text-gray-800 text-lg hover:text-gray-500 pr-4">
              Find Home 
            </li>
          </NavLink>
          <NavLink to="/Property-list">
            <li className="text-gray-800 text-lg hover:text-gray-500 pr-2">
             List Property
            </li>
          </NavLink>
          <NavLink to="/agents">
            <li className="text-gray-800 text-lg hover:text-gray-500 pr-2">
              Agents
            </li>
          </NavLink>
          <NavLink to="/contact">
            <li className="text-gray-800 text-lg hover:text-gray-500 pr-2">
              Contact Us
            </li>
          </NavLink>
        </ul>
        <div className="md:flex md:items-center hidden space-x-4">
          <NavLink to="/login">
            <Button buttonText="Login" />
          </NavLink>
        </div>
      </nav>
      {menuOpen && (
        <ul className="md:hidden space-y-4 py-4 px-4 w-full bg-[#FFFAE9] z-10 transition-all duration-300 ease-in-out">
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
            <NavLink to="/login">
              <Button buttonText="Login" />
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
