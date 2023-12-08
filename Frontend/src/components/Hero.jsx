import React from "react";
import Button from "./Button";
const Hero = () => {
  return (
    <div className="bg-[#FFFAE9] p-4">
      <div className="flex flex-wrap justify-center md:mb-2 md:mx-20 ">
        <div className="w-1/4 sm:w-1/4 p-2">
          <img src="/images/1h.svg" alt="Image 1" className="w-full h-auto " />
        </div>
        <div className="w-1/4 sm:w-1/4 p-2">
          <img
            src="/images/2h.svg"
            alt="Image 2"
            className="w-full h-auto mt-4"
          />
        </div>
        <div className="w-1/4 sm:w-1/4 p-2">
          <img src="/images/3h.svg" alt="Image 3" className="w-full h-auto" />
        </div>
        <div className="w-1/4 sm:w-1/4 p-2">
          <img
            src="/images/4h.svg"
            alt="Image 4"
            className="w-full h-auto mt-4"
          />
        </div>
      </div>

      <h1 className=" font-Albert-sans text-4xl leading-smug p-2 md:text-7xl md:tracking-tight font-bold md:mx-20 md:pr-20">
        Home is where your story begins
      </h1>
      <p className="text-[#666270] text-base p-2 md:max-w-4xl md:p-4 md:text-xl md:mx-20">
        Building a next-generation collaborative platform to connect renters,
        homeowners, and agents. Live the way you want. Beautiful homes.
        Incredible locations. Pricing that makes sense.
      </p>
      <div className="bg-[#fff] grid grid-cols-1 md:grid-cols-3 gap-4 p-6 md:mx-20 md:max-w-3xl ">
        <input
          type="text"
          placeholder="Where do you want to live?"
          className="border border-[#D6D4DD] rounded-md placeholder:bg-transparent p-2 max-w-xs "
        />
        <input
          type="text"
          placeholder="What type of home?"
          className="border border-[#D6D4DD] rounded-md placeholder:bg-transparent p-2 max-w-xs"
        />
        <Button
          buttonText="Find a Home"
          className="col-start-2 col-span-2 md:col-start-3 md:col-span-1"
        />
      </div>
    </div>
  );
};

export default Hero;
