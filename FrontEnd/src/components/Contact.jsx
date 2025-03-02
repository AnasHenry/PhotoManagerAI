import React, { useState } from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import imgurl from "../assets/building.jpg"

const ContactPage = () => {
  const [showPhoneNumbers, setShowPhoneNumbers] = useState(false);
  const [displayNumbers, setDisplayNumbers] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const handlePhoneHover = () => {
    setIsIconVisible(false);
    setShowPhoneNumbers(true);
  };

  const handlePhoneLeave = () => {
    setShowPhoneNumbers(false);
    setIsIconVisible(true);
    setDisplayNumbers(false);
  };

  return (
    <section className='contact-page' id='contact'>
      <div className='contact-left'>
        <div className='img-cont'>
          <img src={imgurl}></img>
          <p>9/87, Thoppupalayam, Perundurai, Erode. Tamil Nadu</p>
          <motion.div
            className='phone-icon'
            onMouseEnter={handlePhoneHover}
            onMouseLeave={handlePhoneLeave}
            animate={{
              width: showPhoneNumbers ? "230px" : "50px",
              height: showPhoneNumbers ? "80px" : "50px",
              borderRadius: showPhoneNumbers ? "20px" : "50%",
              backgroundColor: showPhoneNumbers ? "#555" : "#333",
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                backgroundColor: { duration: 0.5 },
              },
            }}
            onAnimationComplete={() => {
              if (showPhoneNumbers) {
                setDisplayNumbers(true);
              } else {
                setDisplayNumbers(false);
              }
            }}>
            {displayNumbers ? (
              <div className='phone-numbers'>
                <p>+91 23456 78900</p>
                <p>+91 98765 43210</p>
              </div>
            ) : null}
            {isIconVisible && !showPhoneNumbers ? (
              <FaPhone className='icon' />
            ) : null}
          </motion.div>
        </div>
      </div>

      <div className='contact-divider'></div>
      <div className='contact-right'>
        <h2>Having Any Queries?...</h2>
        <h4>Feel free to contact us, Because for us your opinions matters the most</h4><br />
        <p>
          <strong>Email:</strong> info@company.com
        </p>
        <p>
          <strong>Location:</strong> 1234 Business St, City, Country
        </p><br /> 

        <div className='social-links'>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'>
            <FaInstagram className='social-icon' />
          </a>
          <a
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'>
            <FaFacebook className='social-icon' />
          </a>
          <a
            href='https://www.linkedin.com'
            target='_blank'
            rel='noopener noreferrer'>
            <FaLinkedin className='social-icon' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
