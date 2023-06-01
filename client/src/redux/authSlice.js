import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userCredentials) => {
        console.log(userCredentials);
        const response = await api.post('/auth/register', userCredentials);
        return response.data;
    }
);

const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials) => {
        const response = await api.post('/auth/login', userCredentials);
        return response.data;
    }
);

const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        const response = await api.get('/auth/get-auth-user');
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export { registerUser, loginUser, getUser };
export const { logoutUser, setUser} = authSlice.actions;
export default authSlice.reducer;

// HELPED WITH UNDERSTANDING
// https://redux-toolkit.js.org/api/createAsyncThunk
