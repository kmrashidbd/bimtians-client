import { chatApiSlice } from "./apiSlice";

const chatApi = chatApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: () => '/allStudent'
        }),
        fetchChat: builder.query({
            query: () => '/fetchChatByUserId',
            providesTags: ["chat"]
        }),
        getAllMessage: builder.query ({
            query: (id)=> `/messages?chatId=${id}`,
            providesTags: ["chatMessage"]
        }),
        sendMessage: builder.mutation({
            query: (data)=>({
                url: '/sendMessege',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["chat", "chatMessage"]
        }),
        accessChat: builder.mutation({
            query: (id)=>({
                url: `/accessChat?receiver=${id}`,
                method: 'POST'
            }),
            invalidatesTags: ["chat"]
        }),
        getChatById: builder.query({
            query: (id)=>`/getChatById?id=${id}`,
            providesTags: ["chat"]
        }),
        createGroupChat : builder.mutation({
            query: (data)=> ({
                url: '/createGroupChat',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["chat"]
        }),
        addGroupChatUser:builder.mutation({
            query: (data) =>({
                url: '/addGroupChatUser',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["chatUser"]
        }),
        getGroupChatUser : builder.query({
            query: (id) => `/groupChatUser?id=${id}`,
            providesTags: ["chatUser"]
        }),
        deleteChatUser: builder.mutation({
            query: ({id, chatId}) => ({
                url: `/removeGroupChatUser?id=${id}&chatId=${chatId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["chatUser"]
        }),
        updateGroup:builder.mutation({
            query: ({id, name}) =>({
                url: `/update?id=${id}`,
                method: 'PUT',
                body: name
            }),
            invalidatesTags: ["chat"]
        }),
        getNotification: builder.query({
            query: (id)=>`/notification?id=${id}`,
            providesTags: ["notification"]
        }),
        postNotification: builder.mutation({
            query: (data) =>({
                url: `/notification`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['notification']
        }),
        deleteNotification: builder.mutation({
            query: (id) =>({
                url: `/notification?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['notification']
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/deleteGroup?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["chat"]
        })
    })
});

export const {
    useGetAllStudentQuery,
    useFetchChatQuery,
    useGetChatByIdQuery,
    useGetAllMessageQuery,
    useAccessChatMutation,
    useCreateGroupChatMutation,
    useSendMessageMutation,
    useGetGroupChatUserQuery,
    useAddGroupChatUserMutation,
    useUpdateGroupMutation,
    useDeleteChatUserMutation,
    useDeleteGroupMutation,
    usePostNotificationMutation,
    useGetNotificationQuery,
    useDeleteNotificationMutation
} = chatApi;