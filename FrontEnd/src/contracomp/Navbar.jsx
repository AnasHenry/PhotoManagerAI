import React, { useState } from "react";
import './home.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import menuIcon from '../assets/menu-button.png';
import { FaTachometerAlt, FaFileAlt, FaCalendarAlt, FaCog, FaListAlt, FaHome, FaInfoCircle, FaServicestack, FaPhone,  FaUserCircle } from 'react-icons/fa';
function Navbar(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };
    return(
        <div className="header">
            <nav className="navbar">
                <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="dropbtn">
                        <img src={menuIcon} alt="Menu" width="30" height="30" />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <Link to="/Dashboard"><FaTachometerAlt /> Dashboard</Link>
                            <Link to="/statements"><FaFileAlt /> Statements</Link>
                            <Link to="/schedules"><FaCalendarAlt /> Schedules</Link>
                            <Link to="/settings"><FaCog /> Settings</Link>
                            <Link to="/services"><FaListAlt /> More Services</Link>
                            <Link to="/Profile"><FaUserCircle/>Profile</Link>
                        </div>
                    )}
                </div>
                <ul className="nav-links">
                    <li><Link to="/"><FaHome /> Home</Link></li>
                    <li><Link to="/about"><FaInfoCircle /> About</Link></li>
                    <li><Link to="/services"><FaServicestack /> Services</Link></li>
                    <li><Link to="/contact"><FaPhone /> Contact</Link></li>
                </ul>
            </nav>
         </div>
    )
};
export default Navbar;
