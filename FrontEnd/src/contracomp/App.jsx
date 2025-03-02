import React from 'react';
import Home from './components/home';
import Dashboard from './components/Dashboard';
import Profile from './components/profile';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Profile" element={<Profile/>}/>
        </Routes>
      </Router>
    )
}

export default App;
