import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      // console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken",response.data.refreshToken);
      setPopupMessage(response.data.message || "Login Successful");
      setShowPopup(true);
      setPopupVisible(true);
      // navigate("/dashboard")
      if (response.data.success) {
        setEmail("");
        setPassword("");
      }

      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
      navigate("/dashboard");
    } catch (error) {
      setPopupMessage("Error logging in. Please check your credentials.");
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
    <div className="login-section">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <br />
        <button type="submit">Login</button>
        <br />
        <br />
        <h3 className="login-info1">New to our services?..</h3>
        <button onClick={handleRegisterClick}>Sign Up</button>
      </form>
      {showPopup && (
        <div className={`login-popup ${popupVisible ? "show" : "hide"}`}>
          <div className="login-popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
