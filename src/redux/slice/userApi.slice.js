import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/user",
    credentials: "include",
  }),
  tagTypes: ["getAllPost", "getAllSuggestedUsers", "getAllCommentsForPost"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/post/get/all",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res.data;
      },
      providesTags: ["getAllPost"],
    }),
    getSuggestedUsers: builder.query({
      query: () => ({
        url: "/self/suggested-user",
        method: "get",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
      providesTags: ["getAllSuggestedUsers"],
    }),

    getUserBio : builder.query({
      query : (userId) => ({
        url :  `/self/get-bio/${userId}`,
        method : "GET",
        credentials : "include"
      }),
      transformResponse : (res) => res.data
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["getAllPost"],
    }),

    // all api calling related from reactions and comment.
    getCommentForPost: builder.query({
      query: (postId) => ({
        url: `/reaction/get-total-comments-post/${postId}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res) => {
        return res?.data;
      },
      providesTags: ["getAllCommentsForPost"],
    }),

   
    createReaction: builder.mutation({
      query: ({ reactions, postId }) => ({
        url: `/reaction/create-reaction/${postId}`,
        method: "POST",
        credentials: "include",
        body: { reactions },
      }),
      invalidatesTags: ["getAllCommentsForPost"],
    }),

    createComment : builder.mutation({
      query : ({commentMessage , postId}) => ({
        url : `/reaction/create-comment/${postId}`,
        method : "POST",
        credentials : "include",
        body : {commentMessage}
      }),
      invalidatesTags: ["getAllCommentsForPost"],
    }),

    createLikeForPost : builder.mutation({
      query : ({postId}) => ({
        url : `/reaction/create-reaction/${postId}`,
        method : "POST",
        credentials : "include"
      })
    }),


    
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSuggestedUsersQuery,
  useCreatePostMutation,
  useLazyGetCommentForPostQuery,
  useCreateCommentMutation,
  useCreateReactionMutation,
  useCreateLikeForPostMutation,
  useGetUserBioQuery
  
} = userApi;
