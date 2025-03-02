import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './CounterBox.css'; 

const CounterBox = ({ inView }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
      <div className='counter-container'>
        {[
          { count: 350, label: "Services Provided" },
          { count: 125, label: "Companies Served" },
          { count: 50, label: "Contracts Per Month" },
          { count: 5, label: "Average Rating" },
        ].map((item, index) => (
          <div
            className='counter-box'
            key={index}
            onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
            onMouseLeave={() => setHoveredIndex(null)} // Reset on mouse leave
          >
            {/* Trophy on the left */}
            {hoveredIndex === index && (
              <motion.div
                className='trophy trophy-left'
                initial={{ opacity: 0, x: -50, rotate: 0 }}
                animate={{ opacity: 1, x: -50, rotate: -15 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                🏆 {/* Left Trophy */}
              </motion.div>
            )}
  
            <h2 className='counter'>
              {inView && <CountUp start={0} end={item.count} duration={3} />}+
            </h2>
            <p>{item.label}</p>
  
            {/* Trophy on the right */}
            {hoveredIndex === index && (
              <motion.div
                className='trophy trophy-right'
                initial={{ opacity: 0, x: 50, rotate: 0 }}
                animate={{ opacity: 1, x: 50, rotate: 15 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                🏆 {/* Right Trophy */}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    );
};

export default CounterBox;
