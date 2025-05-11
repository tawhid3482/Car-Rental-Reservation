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
      query: (id: string | undefined) => ({
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
    returnCar: builder.mutation({
      query: (data) => ({
        url: `cars/return`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSingleCar: builder.mutation({
      query: ({id, data}) => ({
        url: `cars/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCar: builder.mutation({
      query: (id:string) => ({
        url: `cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useAddCarsMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetSingleCarQuery,
  useReturnCarMutation,
  useUpdateSingleCarMutation
} = authApi;
