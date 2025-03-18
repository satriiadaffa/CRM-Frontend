// src/components/Home.js
import React from "react";
import "../App.css"; // Impor file CSS khusus

const Home = () => {
  return (
    <div className="home-container">
        <div class="col-7"></div>
        <div class="col">
        <h1 className="home-title">Welcome to Customer Relationship Management App</h1>
        <p> Together, we create something wonderful with our services!</p>
        <div class="row">
        <div class="col">
            <button href="/login" className="btn btn-primary form-control" >Login</button>
        </div>
        <div class="col">
        <button className="btn btn-outline-light form-control">Register</button>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Home;
