import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import ContactHome from "./pages/ContactHome";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import FindProperty from "./pages/FindProperty";
import Agent from "./pages/Agent";
import PropertyList from "./pages/PropertyList";
import Error404 from "./components/Error404";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/findproperty"
              element={
                <PrivateRoute>
                  <FindProperty />
                </PrivateRoute>
              }
            />
            <Route
              path="/listproperty"
              element={
                <PrivateRoute>
                  <PropertyList />
                </PrivateRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <PrivateRoute>
                  <Agent />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactHome />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Home />} />
            <Route path="/404" element={<Error404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
