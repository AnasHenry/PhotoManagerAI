import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCon from './components/UserCon';
import ClientRegister from './components/ClientRegister';
import Register from './components/register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/userselect" element={<UserCon />} />
          <Route path="/register-client" element={<ClientRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
