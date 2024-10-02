import React, { useState, useRef, useEffect } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Function to rotate image on hover
  const handleMouseEnter = () => {
    // setAngle(localStorage.getItem('angle'));
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    localStorage.setItem("angle", angle);
  };

  useEffect(() => {
    if (isHovered) {
      // Start rotating when hovered
      intervalRef.current = setInterval(() => {
        setAngle((prevAngle) => prevAngle + 0.1); // Increment angle continuously
      }, 20); // Approximately 60 FPS
    } else {
      clearInterval(intervalRef.current); // Stop when not hovered
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isHovered]);

  return (
    <div className='landing-page'>
      <nav className='navbar'>
        <div className='logo'>MyBrand</div>
        <ul className='nav-links'>
          <li>
            <a href='#about'>About</a>
          </li>
          <li>
            <a href='#projects'>Projects</a>
          </li>
          <li>
            <a href='#contact'>Contact</a>
          </li>
        </ul>
        <button className='login-button' onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className='hero'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div
          className='bg-image'
          style={{
            transform: `rotate(${angle}deg)`, // Rotate based on angle state
            transition: isHovered ? "none" : "transform 1s linear", // Smooth transition only when not hovering
          }}></div>
        <div className='hero-content'>
          <h1>Welcome to Our Client Platform</h1>
          <p>Your gateway to the best services</p>
          <a href='#about' className='cta-button'>
            Learn More
          </a>
        </div>
      </section>
      <section id='about' className='about'>
        <br />
        <h2>About Us</h2>
        <p>We are dedicated to providing top-notch services to our clients.</p>
      </section>

      {/* Projects Section with flowing text */}
      <section id='projects' className='projects'>
        <h2>Our Projects</h2>
        <div className='flow'>
          <p>Discover our latest work and how we can help you grow.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='contact'>
        <h2>Contact Us</h2>
        <p>Get in touch with us for any queries or services.</p>
      </section>
    </div>
  );
};

export default Landing;
