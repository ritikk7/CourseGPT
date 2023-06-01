import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getUser, setUser} from "../redux/authSlice";

const LoginSuccessPage = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authState.user) {
            dispatch(getUser()).then(response => {
                dispatch(setUser(response.payload));
                navigate('/');
            });
        }
    }, [navigate, dispatch, authState.user]);

    return null;
};

export default LoginSuccessPage;


// https://reactrouter.com/en/main/hooks/use-navigate
