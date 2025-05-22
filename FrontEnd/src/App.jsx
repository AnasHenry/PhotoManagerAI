import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Dashboard from "./dashboard/dash";
import Contracts from "./dashboard/comps/Contracts";
import Dboard from "./dashboard/comps/Dboard";
import ProfilePage from "./dashboard/comps/Profile";
import Calendar from "./dashboard/comps/Calendar";
import FAQ from "./dashboard/comps/Faq";
import Stats from "./dashboard/comps/Stats";
import Area from "./dashboard/charts/Area";
import Radar from "./dashboard/charts/Radar";
// import Profile from "./contracomp/profile";
// import Home from "./contracomp/Home";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Dboard />} />
            <Route path='contracts' element={<Contracts />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='area' element={<Area />} />
            <Route path='radar' element={<Radar />} />
            <Route path='stats' element={<Stats />} />
          </Route>
          {/* <Route path='/profile' element={<Profile />} /> */}
          {/* <Route path='/home' element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
