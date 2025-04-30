import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import "./Register.css";

const Register = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        fname,
        lname,
        email,
        password,
        mobile,
        companyname,
      });

      setPopupMessage(response.data.message || "User registered successfully");
      setShowPopup(true);
      setPopupVisible(true);
      setFName("");
      setLName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setCompanyname("");
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
    } catch (error) {
      setPopupMessage("Error registering user");
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
        <h4>First name:</h4>
        <input
          type='text'
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          required
        />
        <h4>Last name:</h4>
        <input
          type='text'
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          required
        />
        <h4>Email:</h4>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h4>Password:</h4>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <h4>Mobile Number:</h4>
        <input
          type='text'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <h4>Company Name:</h4>
        <input
          type='text'
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          required
        />
        <button type='submit'>Register</button>
        <br />
        <button onClick={handleLoginClick}>Log In </button>
      </form>
      {showPopup && (
        <div className={`register-popup ${popupVisible ? "show" : "hide"}`}>
          <div className='register-popup-content'>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
