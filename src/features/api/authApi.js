import { apiSlice } from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerStudent: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
        }),
        loginStudent: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
        }),
        loggedInStudent: builder.query({
            query: () => '/auth/loggedIn'
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/changePassword',
                method: 'PUT',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `/auth/resetPassword/${data.id}`,
                method: 'PUT',
                body: {password: data.password}
            })
        }),
        getAdmins: builder.query({
            query: ()=>'/auth/adminPanel'
        })
    })
});

export const {
    useRegisterStudentMutation,
    useLoginStudentMutation,
    useLoggedInStudentQuery,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useGetAdminsQuery
} = authApi;