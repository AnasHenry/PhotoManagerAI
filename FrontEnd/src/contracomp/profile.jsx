import React, { useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './profile.css';
import Navbar from './Navbar';

function Profile() {
    const [personalDetails, setPersonalDetails] = useState({
        name: 'The king of hell',
        email: 'roronoazoro@gmail.com',
        phone: '9177356765',
    });

    const [professionalDetails, setProfessionalDetails] = useState({
        companyName: 'Straw Hat Pirates',
        area: 'East Blue',
        eventsManaged: 5,
        industryArea: 'Adventure & Exploration',
    });

    
    const [personalFormData, setPersonalFormData] = useState({ ...personalDetails });
    const [professionalFormData, setProfessionalFormData] = useState({ ...professionalDetails });

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setPersonalFormData({ ...personalFormData, [name]: value });
    };

    const handleProfessionalChange = (e) => {
        const { name, value } = e.target;
        setProfessionalFormData({ ...professionalFormData, [name]: value });
    };

    const handlePersonalSubmit = (e) => {
        e.preventDefault();
        setPersonalDetails(personalFormData);
        alert('Personal details updated successfully!');
    };

    const handleProfessionalSubmit = (e) => {
        e.preventDefault();
        setProfessionalDetails(professionalFormData);
        alert('Professional details updated successfully!');
    };

    return (
        <div className="profmain">
            <div className="topprof">
                <Navbar />
            </div>
            <hr />
            <div className="midprof">
                <div className="midprofleft">
                    <h4>Menu</h4>
                    <ul className="midprofleftlink">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/">Plans</Link></li>
                        <li><Link to="/">Files</Link></li>
                        <li><Link to="/">Photos</Link></li>
                        <li><Link to="/">Update Profile</Link></li>
                    </ul>
                </div>

                <div className="midprofmid">
                    <div className="midprofmidfr">
                        <div className="midprofmidfrfr">
                            <div className="midprofmidfrfrpic"></div>
                            <div className="name-container">
                                <h4>Name:</h4>
                                <p>{personalDetails.name}</p>
                            </div>
                            <div className="name-container">
                                <h4>Email:</h4>
                                <p>{personalDetails.email}</p>
                            </div>
                            <div className="name-container">
                                <h4>Phone:</h4>
                                <p>{personalDetails.phone}</p>
                            </div>
                        </div>

                        <div className="midprofmidfrsc">
                            <h4>Personal Details</h4>
                            <form onSubmit={handlePersonalSubmit} className="profile-form">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={personalFormData.name}
                                        onChange={handlePersonalChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={personalFormData.email}
                                        onChange={handlePersonalChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={personalFormData.phone}
                                        onChange={handlePersonalChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">Update Personal Details</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="midprofright">
                    <h4>Professional Details</h4>
                    <form onSubmit={handleProfessionalSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Company Name:</label>
                            <input
                                type="text"
                                name="companyName"
                                value={professionalFormData.companyName}
                                onChange={handleProfessionalChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>User Category:</label>
                            <input
                                type="text"
                                name="area"
                                value={professionalFormData.area}
                                onChange={handleProfessionalChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>No. of Events Managed (per year):</label>
                            <input
                                type="number"
                                name="eventsManaged"
                                value={professionalFormData.eventsManaged}
                                onChange={handleProfessionalChange}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Industry Area:</label>
                            <input
                                type="text"
                                name="industryArea"
                                value={professionalFormData.industryArea}
                                onChange={handleProfessionalChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Update Professional Details</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
