import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: () => "/hotels",
    }),
    getAllLocations: builder.query({
      query: () => "/locations",
    }),
    getHotelById: builder.query({
      query: (id) => `/hotels/${id}`,
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "/hotels",
        method: "POST",
        body: hotel,
      }),
    }),
    addReview: builder.mutation({
      query: ({ hotelId, ...review }) => ({
        url: `/hotels/${hotelId}/reviews`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetAllLocationsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useAddReviewMutation,
} = api;