import React from "react";

const CtaSection = () => {
  return (
    <div className="flex px-6 py-8 flex-col md:flex-row  items-center  bg-[#f0ebdb]">
      <div className="flex flex-wrap justify-center md:w-1/2 md:p-16">
        <div className="w-1/2 sm:w-1/2 p-2">
          <img
            src="/images/cta1.svg"
            alt="Image 2"
            className="w-full h-auto "
          />
        </div>
        <div className="w-1/2 sm:w-1/2 p-2">
          <img src="/images/cta2.svg" alt="Image 3" className="w-full h-auto" />
        </div>
      </div>
      <div className="flex flex-col md:w-1/2 md:p-8">
        <h1 className=" font-Albert-sans text-4xl leading-smug p-2 md:text-7xl md:tracking-tight font-bold ">
          Ready to find your dream home?
        </h1>
        <p className="text-[#666270] text-base p-2  md:text-xl ">
          Building a next-generation collaborative platform to connect renters,
          homeowners, and agents. Live the way you want. Beautiful homes.
        </p>
        <div className="flex flex-col md:flex-row p-2">
        <button className="bg-orange max-w-fit text-textwhite font-[Albert-sans]  py-2 px-6 md:mr-4 rounded-md duration-500 ">
            Find Home
          </button>
          <button className="bg-[#6637EE] max-w-fit text-textwhite font-[Albert-sans] my-4 md:my-0 py-2 px-6 rounded-md duration-500">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
