import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <h1>my name is raja</h1>
      <Footer />
    </div>
  );
}

export default App;
