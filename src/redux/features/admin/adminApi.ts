import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addToBooking: builder.mutation({
    //   query: (info) => ({
    //     url: "bookings",
    //     method: "POST",
    //     body: info,
    //   }),
    //   invalidatesTags: ["booking"],
    // }),
    getAdminStats: builder.query({
      query: () => ({
        url: "admin/adminStats",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const { useGetAdminStatsQuery } = adminApi;
