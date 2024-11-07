import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import imageUrl2 from "../assets/port1.jpg";
import imageUrl1 from "../assets/client.jpg";
import imageUrl3 from "../assets/store.jpg";

const About = () => {
  const [isInView, setIsInView] = useState(false);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of the section is in view
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);
  return (
    <section id='about' className='about' ref={aboutSectionRef}>
      <motion.h1
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}>
        About Us
      </motion.h1>
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
        <Card imageUrl={imageUrl3} title='Better Storage for photos' description='Manage your photos related to your contracts' />
      </div>
    </section>
  );
};

export default About;
