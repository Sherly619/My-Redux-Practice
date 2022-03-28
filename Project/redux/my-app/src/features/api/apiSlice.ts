import { nanoid } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { reactions } from '../../api/client';
import { EditPost, InitItem, PostsState, PostState } from '../posts/postsSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/fakeApi' }),
  tagTypes: ['Post', 'User'],
  endpoints: builder => ({
    getPosts: builder.query<PostsState, void>({
      query: () => ({ url: '/getPosts'}),
      providesTags: (result) =>
        result ?
        [
          ...result.map(post => ({ type: 'Post' as const, id: post.id})),
          { type: 'Post', id: 'LIST' }
        ]
        : [{ type: 'Post', id: 'LIST' }]
    }),
    getPost: builder.query<PostState, string>({
      query: postId => ({url: `/getPost/${postId}`}),
      providesTags: (_result, _error, arg) => [{ type: 'Post', arg }]
    }),
    addPost: builder.mutation<void, InitItem>({
      query: item => {
        const newPost = {
          id: nanoid(),
          date: new Date().toISOString(),
          ...item,
          reactions: Object.assign({}, reactions)
        }
        return {
          url: '/addPost',
          method: 'POST',
          body: newPost
        }
      },
      invalidatesTags: (_result, _error, _arg) => [{ type: 'Post', id: 'LIST' }],
    }),
    editPost: builder.mutation<void, EditPost>({
      query: item => ({
        url: '/editPost',
        method: 'POST',
        body: item
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id}]
    })
  })
});

export const { 
  useGetPostsQuery, 
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation
} = apiSlice;