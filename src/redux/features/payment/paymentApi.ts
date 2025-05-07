import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Send a new Payment
    savePayment: builder.mutation({
      query: (data) => ({
        url: "Payment",
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
  }),
});

export const {
  useSavePaymentMutation,
  useInitiatePaymentMutation,
} = PaymentApi;
