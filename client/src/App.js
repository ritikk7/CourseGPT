import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LoginSuccess from './pages/LoginSucess/LoginSuccess';
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
