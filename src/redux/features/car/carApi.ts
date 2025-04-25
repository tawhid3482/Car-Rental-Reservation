import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCars: builder.mutation({
      query: (info) => ({
        url: "cars",
        method: "POST",
        body: info,
      }),
    }),
    getAllCars: builder.query({
      query: () => ({
        url: "cars",
        method: "GET",
        // body: userInfo,
      }),
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query({
      query: (id: string|undefined) => ({
        url: `cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: ({ id, data }) => {
        // console.log(id, data);
        return {
          url: `cars/love/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useAddCarsMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
  useGetSingleCarQuery,
} = authApi;
