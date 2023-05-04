import { studentApiSlice } from "./apiSlice";

const chatApi = studentApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: () => '/chat/allStudent'
        }),
        sentMessage: builder.mutation({
            query: ({ id, message }) => ({
                url: `/chat/sendMessege?receiver=${id}`,
                method: 'POST',
                body: { message }
            })
        }),
        allMessage: builder.query({
            query: (id)=>`/chat/messages?receiver=${id}`
        })
    })
});

export const {
    useGetAllStudentQuery,
    useSentMessageMutation,
    useAllMessageQuery
} = chatApi;