import React from "react";
import './home.css';
import Navbar from "./Navbar";
function Home() {

    return (
        <div className="main">
            <div className="hfirst">
                <Navbar/>
                <div className="body">
                    <div><h1><b>Smart Album<br /> Creation</b></h1></div>
                    <div><p>With smart face recognition and<br /> auto-editing, albums are crafted with precision and speed,<br /> delivering unforgettable moments faster than ever.</p></div>
                    <button type="button" className="sbt">New Project</button>
                </div>
            </div>
            <div className="hsecond">
                <h1>cards</h1>
            </div>
        </div>
    );
}

export default Home;
