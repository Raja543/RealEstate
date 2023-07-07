import React from "react";
import Button from "../Navbar/Button";

const Footer = () => {
  return (
    <div className="bg-[#FFFAE9] p-2 md:p-10">
      <div className=" flex flex-col md:flex-row md:justify-between">
        <div className="flex-col justify-center items-center px-4 md:px-0 order-4 md:order-1">
          <img
            className="w-32 cursor-pointer "
            src="/images/Logo.svg"
            alt="Logo"
          />
          <p className="text-[#666270] text-xl max-w-sm hover:text-gray-500  pt-3 pb-4 ">
            Building a next-generation collaborative platform to connect
            renters, homeowners, and agents.
          </p>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Enter your email"
              className="border border-[#D6D4DD] rounded-md placeholder:bg-transparent  max-w-xs mr-4 w-64 p-2 mb-2 md:mb-0"
            />
            <Button buttonText="Send" />
          </div>
        </div>
        <div className="md:flex md:justify-center order-1 md:order-2">
          <ul className="flex flex-col space-y-3 px-4 pt-4 pb-2 ">
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Dwelling
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Find my home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Homeowners
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Community
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Review
              </a>
            </li>
          </ul>
        </div>

        <div className="md:flex md:justify-center order-2 md:order-3">
          <ul className="flex flex-col space-y-3 px-4 pt-4 pb-2">
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Company
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Articles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Press
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Refer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Api documentation
              </a>
            </li>
          </ul>
        </div>
        <div className="md:flex md:justify-center order-3 md:order-4">
          <ul className="flex flex-col space-y-3 px-4 pt-4 pb-2">
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#666270] text-xl  hover:text-gray-500  pt-3 pb-4"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="md:flex md:justify-between items-center md:py-2 px-4">
        <div className="flex m-0 p-0">
          <img
            src="/images/fb.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
          <img
            src="/images/ln.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
          <img
            src="/images/ln.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
        </div>
        <h1 className="text-[#666270] text-xl  hover:text-gray-500  pt-4 pb-4">
          Copyright @Raja 2023
        </h1>
      </div>
    </div>
  );
};

export default Footer;
