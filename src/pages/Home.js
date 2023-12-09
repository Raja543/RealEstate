import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CountDown from "../components/CountDown";
import About from "../components/About";
import CtaSection from "../components/CtaSection";
import Testimonial from "../components/Testimonial";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CountDown />
      <About />
      <Testimonial />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default Home;
