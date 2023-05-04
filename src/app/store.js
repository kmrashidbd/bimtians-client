import { configureStore } from '@reduxjs/toolkit';
import { apiSlice, studentApiSlice } from '../features/api/apiSlice';
import authSlice from '../features/reducers/authSlice';
import studentSlice from '../features/reducers/studentSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [studentApiSlice.reducerPath]: studentApiSlice.reducer,
        student: studentSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(apiSlice.middleware).concat(studentApiSlice.middleware)
});

export default store;