import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./UserLogin.css"

const gradient = {
  padding: "20px",
  width: "100%",
  height: "740px",
  position: "relative",
};

const contentStyle = {
  position: "relative", // Ensure content is positioned relative to its container
  zIndex: "2", // Set a higher zIndex to ensure content is displayed above the video
};

export default function UserLogin() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("bgAudio");
    if (audio) {
      if (isAudioPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isAudioPlaying]);

  const successRes = (credentialResponse) => {
    const profileObj = JSON.parse(atob(credentialResponse.credential.split('.')[1])); // Decoding JWT
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("email", profileObj.email);
    localStorage.setItem("name", profileObj.given_name);
    console.log(profileObj);
    window.location.pathname = "/game";
  };

  const failureRes = () => {
    console.log("Login Failed");
  };

  return (
    //clientId="346581180770-60fabpkido06nalsfr5ulmgft7jjrh6r.apps.googleusercontent.com"
    <GoogleOAuthProvider clientId="571741486182-4d25t3i3i9h8h0obbs8epje5pu3lk7lo.apps.googleusercontent.com">
      <div style={gradient}>
        <div style={contentStyle}>
         
          <br />
          <div className="d-flex justify-content-center">
            <Card style={{ padding: "10px", marginLeft: "600px", marginTop: "100px" }} className="resDiv">
              <CardBody>
                <CardTitle>
                  <h3 style={{ marginBottom: "30px" }}>Login</h3>
                </CardTitle>
              </CardBody>
              <CardBody>
                <GoogleLogin
                  onSuccess={successRes}
                  onError={failureRes}
                  useOneTap
                  buttonText={<b>Sign in with Google</b>}
                  className="googlebutton mt-4 rounded-pill"
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
