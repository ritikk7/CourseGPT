import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SchoolSelector from './pages/SchoolSelector';

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
            <Route path="/temp" element={ <SchoolSelector/> }/>
        </Routes>
    );
}

export default App;
