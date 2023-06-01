import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import LoginSuccess from './pages/LoginSuccess';
function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/login-success" element={ <LoginSuccess/> }/>
        </Routes>
    );
}

export default App;
