import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CountDown from "../components/CountDown";
import About from "../components/About";
import CtaSection from "../components/CtaSection";
import Testimonial from "../components/Testimonial";
import VideoSection from "../components/VideoSection/VideoSection";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CountDown />
      <About />
      <VideoSection />
      <Testimonial />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default Home;
