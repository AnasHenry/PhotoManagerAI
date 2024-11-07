import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/adminlogin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        mobile
      });

      setPopupMessage(response.data.message || 'User registered successfully');
      setShowPopup(true);
      setPopupVisible(true);
      setName('');
      setEmail('');
      setPassword('');
      setMobile('');

      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);

    } catch (error) {
      setPopupMessage('Error registering user');
      setShowPopup(true);
      setPopupVisible(true);

      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!popupVisible) {
      setTimeout(() => {
        setShowPopup(false);
      }, 500); 
    }
  }, [popupVisible]);

  return (
    <div className='register-section'>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className='register-form'>
        <h4>Name:</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h4>Email:</h4>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h4>Password:</h4>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <h4>Mobile Number:</h4>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
        <br/>
        <button onClick={handleLoginClick}>Log In </button>
      </form>
       {showPopup && (
        <div className={`register-popup ${popupVisible ? 'show' : 'hide'}`}>
          <div className="register-popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
