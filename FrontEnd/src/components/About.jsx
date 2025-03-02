import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import imageUrl2 from "../assets/port1.jpg";
import imageUrl1 from "../assets/client.jpg";
import imageUrl3 from "../assets/store.jpg";

const About = () => {
  const aboutSectionRef = useRef(null);
  return (
    <section id='about' className='about' ref={aboutSectionRef}>
      <h1>About Us</h1>
      <p>We are dedicated to providing top-notch services to our clients.</p>
      <br />
      <div className='card-container'>
        <Card
          imageUrl={imageUrl1}
          title='Capture Every Moment'
          description='Seamless AI driven model helps you to organize photos'
        />
        <Card
          imageUrl={imageUrl2}
          title='Enhance your photo albums'
          description='Make attractive albums for your clients'
        />
        <Card
          imageUrl={imageUrl3}
          title='Better Storage for photos'
          description='Manage your photos related to your contracts'
        />
      </div>
    </section>
  );
};

export default About;
