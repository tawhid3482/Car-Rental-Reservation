import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Send a new message
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    // Get all messages between current user and other user
    getMessagesWithUser: builder.query({
      query: (otherUserId: string) => ({
        url: `message/${otherUserId}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    // Get all messages between current user and other user
    getAllConversation: builder.query({
      query: () => ({
        url: `message/conversations`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),

    // Mark messages as seen
    markMessagesAsSeen: builder.mutation({
      query: (data) => ({
        url: "message/seen",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    // Delete a specific message
    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesWithUserQuery,
  useGetAllConversationQuery,
  useMarkMessagesAsSeenMutation,
  useDeleteMessageMutation,
} = messageApi;
