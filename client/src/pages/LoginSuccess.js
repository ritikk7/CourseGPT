import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUser, setUser} from "../redux/authSlice";

const LoginSuccessPage = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser()).then(response => {
            if(response.payload) {
                dispatch(setUser(response.payload));
                navigate('/');
            } else {
                console.error('Login success error', response);
                navigate('/login');
            }
        }).catch(err => {
            console.error('User could not be authenticated', err);
            navigate('/login');
        });
    }, [navigate, dispatch, authState.user]);

    return null;
};


export default LoginSuccessPage;


// https://reactrouter.com/en/main/hooks/use-navigate
