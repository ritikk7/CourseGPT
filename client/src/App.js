import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/profile" element={ <Profile/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
        </Routes>
    );
}

export default App;
