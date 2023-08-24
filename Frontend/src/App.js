import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import ContactHome from "./pages/ContactHome";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import FindProperty from "./pages/FindProperty";
import Agent from "./pages/Agent";
import PropertyList from "./pages/PropertyList";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/findproperty" element={<FindProperty />} />
            <Route path="/listproperty" element={<PropertyList />} />
            <Route path="/agents" element={<Agent />} />
            <Route path="/contacts" element={<ContactHome />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;


