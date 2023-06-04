import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice';
import schoolReducer from './schoolSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
        school: schoolReducer
    },
})
