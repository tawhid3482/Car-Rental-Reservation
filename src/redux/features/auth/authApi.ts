import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserByEmail: builder.query({
      query: (email: string | undefined) => ({
        url: `/auth/users/${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserStat: builder.query({
      query: (id: string) => {
        return {
          url: `auth/users/stats/${id}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ email, payload }) => ({
        url: `/auth/users/${email}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
  useGetUserStatQuery,
} = authApi;
