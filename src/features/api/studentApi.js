import { studentApiSlice } from "./apiSlice";

const studentApi = studentApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        singleStudent: builder.query({
            query: (id) => `/student/${id}`,
            providesTags: ['singleStudent']
        }),
        editBasic: builder.mutation({
            query: (data) => ({
                url: '/student/editBasic',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        changePhoto: builder.mutation({
            query: (data) => ({
                url: `/student/editPhoto`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        addPersonal: builder.mutation({
            query: (data) => ({
                url: '/student/addPersonal',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        editPersonal: builder.mutation({
            query: (data) => ({
                url: `/student/editPersonal`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        addEmployment: builder.mutation({
            query: (data) => ({
                url: '/external/employment/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        editEmployment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/external/employment/edit/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        deleteEmployment: builder.mutation({
            query: (id) => ({
                url: `/external/employment/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['singleStudent']
        }),
        addEmergency: builder.mutation({
            query: (data) => ({
                url: '/external/others/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        editEmergency: builder.mutation({
            query: (data) => ({
                url: '/external/others/edit',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        deleteEmergency: builder.mutation({
            query: (id) => ({
                url: `/external/others/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['singleStudent']
        }),
        addAcademic: builder.mutation({
            query: (data) => ({
                url: '/external/academic/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        editAcademic: builder.mutation({
            query: ({ data, id }) => ({
                url: `/external/academic/edit/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['singleStudent']
        }),
        deleteAcademic: builder.mutation({
            query: (id) => ({
                url: `/external/academic/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['singleStudent']
        }),
        searchStudent: builder.mutation({
            query: (data) => ({
                url: '/student/search',
                method: 'POST',
                body: data
            })
        }),
        studentById: builder.query({
            query: (id) => `/student/${id}`
        })
    })
})

export const {
    useSingleStudentQuery,
    useEditBasicMutation,
    useAddEmergencyMutation,
    useAddEmploymentMutation,
    useEditEmploymentMutation,
    useEditEmergencyMutation,
    useDeleteEmploymentMutation,
    useDeleteEmergencyMutation,
    useAddAcademicMutation,
    useEditAcademicMutation,
    useDeleteAcademicMutation,
    useAddPersonalMutation,
    useEditPersonalMutation,
    useSearchStudentMutation,
    useStudentByIdQuery,
    useChangePhotoMutation
} = studentApi;