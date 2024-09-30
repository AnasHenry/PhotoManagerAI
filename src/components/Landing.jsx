import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">MyBrand</div>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="login-button" onClick={() => navigate("/login")}>
        Login
      </button>
      </nav>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Client Platform</h1>
          <p>Your gateway to the best services</p>
          <a href="#about" className="cta-button">
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>We are dedicated to providing top-notch services to our clients.</p>
      </section>

      {/* Projects Section with flowing text */}
      <section id="projects" className="projects">
        <h2>Our Projects</h2>
        <p>Discover our latest work and how we can help you grow.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any queries or services.</p>
      </section>
    </div>
  );
};

export default Landing;
