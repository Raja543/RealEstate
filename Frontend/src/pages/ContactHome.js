import React from "react";
import Contact from "../components/Contact/Contact";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Testimonial from "../components/TestimonialSection/Testimonial";

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
