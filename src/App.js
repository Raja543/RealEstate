import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/HeroSection/Hero";
import CountDown from "./components/CountDownSection/CountDown";
import About from "./components/AboutSection/About";
// import Property from "./components/PropertySection/Property";
import CtaSection from "./components/CtaSection/CtaSection";
import Testimonial from "./components/TestimonialSection/Testimonial";
import Contact from "./components/Contact/Contact";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CountDown />
      <About />
      {/* <Property /> */}
      <CtaSection />
      <Testimonial />
      <Footer />
      <Contact/>
    </div>
  );
}

export default App;
