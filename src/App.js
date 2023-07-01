import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/HeroSection/Hero";
import CountDown from "./components/CountDownSection/CountDown";
import About from "./components/AboutSection/About";
// import Property from "./components/PropertySection/Property";
import CtaSection from "./components/CtaSection/CtaSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CountDown />
      <About />
      {/* <Property /> */}
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;
