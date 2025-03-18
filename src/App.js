import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CustomerList from "./components/CustomerList";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; // Import Home
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
        <Route path="/" element={<Home />} /> {/* Ganti tulisan langsung dengan komponen Home */}
      </Routes>
    </Router>
  );
}

export default App;
