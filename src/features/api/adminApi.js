import { apiSlice } from "./apiSlice";

const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllStudent: builder.query({
            query: ()=>`/student/all`,
            providesTags: ["adminApi"]
        }),
        updateStudent: builder.mutation({
            query: ({data, id})=>({
                url: `/auth/${id}`,
                method: 'PUT',   
                body: data             
            }),
            invalidatesTags: ['adminApi']
        }),
        deleteStudent : builder.mutation({
            query: (id)=>({
                url: `/auth/${id}`,
                method: 'DELETE',           
            }),
            invalidatesTags: ['adminApi']
        }),
    })
});

export const {
    useGetAllStudentQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} = adminApi;