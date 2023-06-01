import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userCredentials) => {
        try {
            const response = await api.post('/auth/register', userCredentials);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
);

const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials) => {
        try{
            const response = await api.post('/auth/login', userCredentials);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }

    }
);

const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const response = await api.get('/auth/get-auth-user');
            return response.data;
        } catch (error) {
            console.warn("User could not be authenticated", error);
            return false;
        }
    }
);

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            const response = await api.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.user = null;
        },
    },
});

export { registerUser, loginUser, getUser, logoutUser };
export const {  setUser} = authSlice.actions;
export default authSlice.reducer;

// HELPED WITH UNDERSTANDING
// https://redux-toolkit.js.org/api/createAsyncThunk
// Chat GPT
