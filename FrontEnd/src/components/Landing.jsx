import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Hero from "./Hero";
import About from "./About";
import Contact  from "./Contact";
import Project from "./Project";

const Landing = () => {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
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
        setAngle((prevAngle) => prevAngle + 0.1); 
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
      <Hero />
      <About />
      <Project />
      <Contact />
    </div>
  );
};

export default Landing;
