import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
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
        setAngle((prevAngle) => prevAngle + 0.1);
      }, 20); // Approximately 60 FPS
    } else {
      clearInterval(intervalRef.current); // Stop when not hovered
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isHovered]);

  return(
    <section
        className='hero'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div
          className='bg-image'
          style={{
            transform: `rotate(${angle}deg)`, 
            transition: isHovered ? "none" : "transform 1s linear", 
          }}></div>
        <div className='hero-content'>
          <h1>Welcome to Our Client Platform</h1>
          <p>Your gateway to the best services</p>
          <a href='#about' className='cta-button'>
            Learn More
          </a>
        </div>
    </section>
  )
};

export default Hero;
