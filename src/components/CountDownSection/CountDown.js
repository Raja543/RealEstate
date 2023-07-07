import React from "react";

const CountDown = () => {
  return (
    <div className="bg-[#6637EE] md:p-12">
      <h1 className="text-[#FFFFFF] font-bold text-2xl p-4 md:text-center md:text-5xl">
        Trusted by the people across the globe
      </h1>
      <p className="text-[#FFFF] text-base px-4 pt-2 opacity-80  md:text-md md:max-w-6xl md:m-auto">
        Building a next-generation collaborative platform to connect renters,
        homeowners, and agents. Live the way you want. Beautiful homes.
        Incredible locations. Pricing that makes sense.No matter what stage of
        life you’re in, having friends to share experiences with is what it’s
        all about. We’re here to help you find your tribe. No matter what stage
        of life you&apos;re in, having friends and a supportive community to share
        experiences with is what it&apos;s all about. That&apos;s why we&apos;re here to help
        you find your tribe. Our platform goes beyond just matching you with the
        perfect home; it&apos;s about connecting you with like-minded individuals who
        share your passions, interests, and values.
      </p>
      <div className="p-4 flex flex-col md:flex-row md:flex-nowrap md:p-0 md:items-center md:justify-center">
        <div className="flex md:p-4">
          <img src="/images/emoji1.svg" alt="CountDown" />
          <div className="flex flex-col p-4">
            <h1 className="text-[#ffff] text-2xl md:text-3xl">+20K</h1>
            <p className="text-[#ffff] text-base md:text-xl opacity-80">
              Clients worldwide
            </p>
          </div>
        </div>
        <div className="flex md:p-4">
          <img src="/images/emoji2.svg" alt="CountDown" />
          <div className="flex flex-col p-4">
            <h1 className="text-[#ffff] text-2xl md:text-3xl">95.7%</h1>
            <p className="text-[#ffff] text-base md:text-xl opacity-80">
              Satisfied Clients
            </p>
          </div>
        </div>
        <div className="flex md:p-4">
          <img src="/images/emoji3.svg" alt="CountDown" />
          <div className="flex flex-col p-4">
            <h1 className="text-[#ffff] text-2xl md:text-3xl">100+</h1>
            <p className="text-[#ffff] text-base  md:text-2xl opacity-80">
              City Covered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
