import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostsState } from '../posts/postsSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/fakeApi' }),
  endpoints: builder => ({
    getPosts: builder.query<PostsState, void>({
      query: () => ({ url: '/getPosts'})
    }),
    // addPost: builder.query({
    //   query: () => ({
    //     url: '/addNewPosts',
    //     method: 'POST',
    //     body:
    //   })
    // })
  })
});

export const { useGetPostsQuery } = apiSlice;