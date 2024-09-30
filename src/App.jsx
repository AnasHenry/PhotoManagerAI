import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCon from './components/UserCon';
import ClientRegister from './components/ClientRegister';
import Register from './components/register';
import Login from './components/Login';
import Landing from './components/Landing';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing /> } />
          <Route path="/userselect" element={<UserCon />} />
          <Route path="/register-client" element={<ClientRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path='/adminlogin' element={<Login/>}/>
          <Route path ='/login' element={<UserLogin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;