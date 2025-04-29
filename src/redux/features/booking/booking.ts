import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToBooking: builder.mutation({
      query: (info) => ({
        url: "bookings",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["booking"],
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: "bookings",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["booking"],
    }),
    getSingleBooking: builder.query({
      query: (id: string | undefined) => ({
        url: `bookings/my-bookings/id/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getUserBookingByEmail: builder.query({
      query: (email: string | undefined) => ({
        url: `/bookings/my-bookings/${email}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => {
        // console.log(id, data);
        return {
          url: `bookings/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useAddToBookingMutation,
  useGetAllBookingQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
  useGetUserBookingByEmailQuery
} = authApi;
