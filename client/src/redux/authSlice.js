import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userCredentials, {dispatch}) => {
        try {
            const response = await api.post('/auth/register', userCredentials);
            return response.data.user;
        } catch (error) {
            throw error.response.data.error;
        }
    }
);

const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials, {dispatch}) => {
        try {
            const response = await api.post('/auth/login', userCredentials);
            return response.data.user;
        } catch (error) {
            throw error.response.data.error;
        }
    }
);

const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const response = await api.get('/auth/get-auth-user');
            return response.data.user;
        } catch (error) {
            throw error.response.data.error;
        }
    }
);

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            const response = await api.post('/auth/logout');
            return response.data.user;
        } catch (error) {
            throw error.response.data.error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        authError: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state, action) => {
                state.authError = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.authError = action.payload;
            });
    },


});

export {registerUser, loginUser, getUser, logoutUser};
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
