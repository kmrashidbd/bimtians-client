import { jobApiSlice } from "./apiSlice";

const jobApi = jobApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createJob: builder.mutation({
            query: (data) => ({
                url: '/job/create',
                method: 'POST',
                body: data
            }),
        }),
        allJob: builder.query({
            query: () => '/job/all',
            providesTags: ['job']
        }),
        publishedJob: builder.query({
            query: () => '/job/published',
            providesTags: ['job']
        }),
        getjobById: builder.query({
            query: jobId => `/job/${jobId}`
        }),
        getJobByUser: builder.query({
            query: () => '/job/jobByUser',
            providesTags: ['job']
        }),
        editJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `/job/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['job']
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['job']
        })
    })
});

export const {
    useCreateJobMutation,
    useGetJobByUserQuery,
    useGetjobByIdQuery,
    useAllJobQuery,
    usePublishedJobQuery,
    useEditJobMutation,
    useDeleteJobMutation
} = jobApi;