import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ContactHome from "./ContactHome";
import Login from "./components/Login/Login";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import PropertySearch from "./PropertySearch";


function App() {
  return (
 <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<ContactHome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/property-search" element={<PropertySearch/>} />
      </Routes>
 </>
  );
}

export default App;
