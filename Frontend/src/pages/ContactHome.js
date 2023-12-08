import React from "react";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";

const ContactHome = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <div className="bg-[#191623]">
        <Testimonial />
      </div>
     
      <Footer />
    </div>
  );
};

export default ContactHome;
