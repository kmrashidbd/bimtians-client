import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../Components/Shared/host';

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/v1`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["adminApi"],
    endpoints: (builder) => ({})
});

export const studentApiSlice = createApi({
    reducerPath: 'studentApiSlice',
    tagTypes:['singleStudent'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/v1`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },        
    }),
    endpoints: (builder) => ({})
});

export const jobApiSlice = createApi({
    reducerPath: 'jobApiSlice',
    tagTypes:['job'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/v1`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },        
    }),
    endpoints: (builder) => ({})
});