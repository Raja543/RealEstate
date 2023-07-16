import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactHome from "./pages/ContactHome";
import Login from "./components/Login/Login";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import PropertySearch from "./pages/PropertySearch";
import Agents from "./pages/Agent";
import PropertyList from "./pages/PropertyList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<ContactHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/property-search" element={<PropertySearch />} />
        <Route path="/property-list" element={<PropertyList />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/contact" element={<ContactHome />} />
      </Routes>
    </>
  );
}

export default App;
