import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import MultistepResgister from './components/pages/RegisterUserDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* <Route path="/register" element={<MultistepResgister />} /> */}
    </Routes>
  );
}

export default App;
