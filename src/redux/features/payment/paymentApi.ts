import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    savePayment: builder.mutation({
      query: (data) => ({
        url: "payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    // initiate a specific Payment
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: `payment/initiate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    getUserPayment: builder.query({
      query: (email:string) => ({
        url: `payment/${email}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const { useSavePaymentMutation, useInitiatePaymentMutation,useGetUserPaymentQuery } =
  PaymentApi;
