import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Hero from "../components/HeroSection/Hero";
import CountDown from "../components/CountDownSection/CountDown";
import About from "../components/AboutSection/About";
import CtaSection from "../components/CtaSection/CtaSection";
import Testimonial from "../components/TestimonialSection/Testimonial";
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