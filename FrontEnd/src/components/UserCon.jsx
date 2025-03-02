import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCon.css";

const UserCon = () => {
  const navigate = useNavigate();
  const [roleSelected, setRoleSelected] = useState(null);

  const handleClientClick = () => {
    setRoleSelected("client");
  };

  const handlePhotographerClick = () => {
    setRoleSelected("photographer");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* Navbar at the top */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Choose Your Role</h1>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
      <div className="selection-container">
        {/* Client side */}
        <div
          className={`half left ${
            roleSelected === "photographer" ? "vanish-image-photographer" : ""
          }`}
        >
          {roleSelected === "photographer" ? (
            <div className="photographer-form">
              <h1>Photographer Login</h1>
              <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <>
              <h1>I am a...</h1>
              <button onClick={handleClientClick}>Client</button>
            </>
          )}
        </div>
        <div className="divider" />
        {/* Photographer side */}
        <div
          className={`half right ${roleSelected === "client" ? "vanish-image-client" : ""}`}
        >
          {roleSelected === "client" ? (
            <div className="client-form">
              <h1>Client Login</h1>
              <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <>
              <h1>I am a...</h1>
              <button onClick={handlePhotographerClick}>Photographer</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCon;
