import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import FeedbackPage from './components/pages/FeedbackData';

function App() {
  return (
    <Routes>
      <Route path="/data" element={<FeedbackPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
