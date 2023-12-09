import React from "react";
import { HashLink } from "react-router-hash-link";

const ContactHero = () => {
  return (
    <div className="hidden md:block lg:w-3/5 px-10 py-6 lg:py-40 lg:px-20">
      <p className="text-[#fff] text-3xl md:text-3xl lg:text-6xl p-1 lg:p-2">
        Luxurious House
      </p>
      <p className="text-[#fff] text-3xl md:text-3xl lg:text-6xl p-1 lg:p-2">
        Malaibu Hills
      </p>
      <p className="text-[#fff] text-xl md:text-xl lg:text-2xl p-1 lg:p-2">
        Single property Classic theme with beautiful design and well decorated.
      </p>
      <HashLink to="/findproperty">
        <button className="bg-[#e16b35] max-w-fit text-[#fff] font-[Albert-sans] py-2 px-6 rounded-md duration-500 my-2 mx-2 text-lg">
          Book Now
        </button>
      </HashLink>
    </div>
  );
};

export default ContactHero;
