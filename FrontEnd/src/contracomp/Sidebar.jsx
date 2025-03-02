import React from "react";
import './Dashboard.css';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
function Sidebar(){
    return(
        <div className="dleft">
            <div><h1>Photo Manager</h1></div>
            <div className="innerdltop"><ul className="Dash-links">
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/">Statements</Link></li>
                <li><Link to="/">Schedules</Link></li>
                <li><Link to="/">Settings</Link></li>
                <li><Link to="/">Services</Link></li>
            </ul></div>
            <div className="innerdleft">
                <p>have any problems with managing the Dashboard</p>
                <button type="button">Help?</button>
            </div>
        </div>
    )
}
export default Sidebar;