import React from "react";
import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="px-20 py-32">
      <div className="flex flex-col items-center justify-center ">
        <img src="/images/error.svg" alt="404" className="w-1/2" />
      </div>
      <h1 className="font-bold text-3xl text-center my-4">
        No Matching Properties Found
      </h1>
      <div className="flex items-center justify-center">
        <NavLink to="/">
          <button className="bg-orange max-w-fit text-textwhite font-[Albert-sans] py-2 px-6 rounded-md duration-500">
            Return to HomePage
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error404;
