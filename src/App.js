import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import ContactHome from "./pages/ContactHome";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import PropertySearch from "./pages/PropertySearch";
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
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/findproperty" element={<PrivateRoute><PropertySearch /></PrivateRoute>} />
            <Route path="/listproperty" element={<PrivateRoute><PropertyList /></PrivateRoute>} />
            <Route path="/agents" element={<PrivateRoute><Agent /></PrivateRoute>} />
            <Route path="/contacts" element={<PrivateRoute><ContactHome /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
