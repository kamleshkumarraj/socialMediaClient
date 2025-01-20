import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/user",
    credentials: "include",
  }),
  tagTypes: ["getAllPost"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/post/get/all",
        method: "GET",
        credentials: "include",
      }),
      transformResponse : (res) => {
        return res.data
      },
      providesTags: ["getAllPost"],
    }),
    getSuggestedUsers : builder.query ({
      query : () => ({
        url : "/self/suggested-user",
        method : "get",
        credentials : "include"
      }),
      transformResponse : (res) => {
        return res?.data
      }
    })
  }),
});

export const {useGetAllPostsQuery , useGetSuggestedUsersQuery} = userApi