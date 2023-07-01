import React from "react";
import Button from "../Navbar/Button";

const About = () => {
  return (
    <div className="bg-[#e7e3d6] px-6 py-24 flex flex-col  md:flex-row md:px-20 ">
      <div className="flex md:w-full">
        <img src="/images/about1.svg" alt="about1" className="w-3/4 md:w-full max-w-md" />
        {/* <div className="p-8 bg-[#ffff] border max-w-fit flex-row rounded-lg items-center justify-center">
            <img src="/images/about2.svg" alt="about2" className="w-1/8 h-auto p-4 m-auto " />
            <h1 className="text-2xl">David Warner</h1>
            <p className="text-base text-[#666270] text-center p-2">Property agent</p>
            <button className=" bg-[#6637EE] text-[#ffff] py-2 px-4 rounded-md m-auto">Messages</button>
        </div> */}
      </div>

      <div className="py-6 md:mx-16">
        <h1 className="text-4xl md:text-7xl font-bold">
          Providing the effective solutions for you
        </h1>
        <p className="text-base md:text-xl text-[#666270] py-6 ">
          Building a next-generation collaborative platform to connect renters,
          homeowners, and agents. Live the way you want. Beautiful homes.
          Incredible locations. Pricing that makes sense.
        </p>
        <Button className ="md:mx-16" buttonText="More About us"/>
      </div>
    </div>
  );
};

export default About;
