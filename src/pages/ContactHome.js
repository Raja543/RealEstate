import React from "react";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonial";
import ContactHero from "../components/ContactHero";

const ContactHome = () => {
  return (
    <>
      <Navbar />
      <div
        className="py-4 px-4 sm:px-20 md:ox-0 flex flex-col md:flex-row items-center justify-center bg-no-repeat bg-cover bg-center "
        style={{ backgroundImage: "url('/images/cbg.jpeg')" }}
      >
        <ContactHero />
        <ContactForm />
      </div>

      <div className="bg-[#191623]">
        <Testimonial />
      </div>

      <Footer />
    </>
  );
};

export default ContactHome;
