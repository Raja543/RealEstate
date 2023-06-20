import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import CountDown from "./components/CountDown/CountDown";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CountDown />
      <About />
      <h1>my name is raja</h1>
      <Footer />
    </div>
  );
}

export default App;
