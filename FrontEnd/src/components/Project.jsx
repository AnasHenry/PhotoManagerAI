import CountUp from "react-countup";
import React, { useState, useRef, useEffect } from "react";
import { GiTrophy } from "react-icons/gi";
import "./Project.css";
// import "./CounterBox";

const Project = () => {
  const contactRef = useRef(null);
  const [leftTilt, setLeftTilt] = useState(0);
  const [rightTilt, setRightTilt] = useState(0);

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Calculate the visibility percentage
          const { height } = entry.boundingClientRect;
          const visibleHeight = Math.min(height, window.innerHeight);
          const percentage = (visibleHeight / height) * 100;

          // Set tilt based on visibility percentage with limits
          const newLeftTilt = Math.max(-30, (percentage / 100) * -30);
          const newRightTilt = Math.max(0, (percentage / 100) * 30);

          setLeftTilt(newLeftTilt);
          setRightTilt(newRightTilt);
        } else {
          // Reset tilts when not visible
          setLeftTilt(0);
          setRightTilt(0);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll);
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [contactRef]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <section className='projects' ref={sectionRef} id="projects">
      <h1>
        <GiTrophy
          className='trophy-icon tilted-left'
          style={{ transform: `rotate(${leftTilt}deg)` }}
        />
        <span className="head1">Our Achievements</span>
        <GiTrophy
          className='trophy-icon tilted-right'
          style={{ transform: `rotate(${rightTilt}deg)` }}
        />
      </h1>
      <br />
      <br />
      <br />
      <div className='counter-container'>
        <div className='counter-box'>
          <h2 className='counter'>
            {inView && <CountUp start={0} end={350} duration={3} />}+
          </h2>
          <p>Services Provided</p>
        </div>
        <div className='counter-box'>
          <h2 className='counter'>
            {inView && <CountUp start={0} end={125} duration={3} />}+
          </h2>
          <p>Customers benifited</p>
        </div>

        <div className='counter-box'>
          <h2 className='counter'>
            {inView && <CountUp start={0} end={50} duration={3} />}+
          </h2>
          <p>Contracts Per Month</p>
        </div>

        <div className='counter-box'>
          <h2 className='counter'>
            {inView && <CountUp start={0} end={5} duration={3} />}
          </h2>
          <p>Average Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Project;
