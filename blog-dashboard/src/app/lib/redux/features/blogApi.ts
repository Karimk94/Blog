'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BlogPost, NewBlogPost } from '../../../types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: BlogPost[]; totalCount: number }, { page: number; limit: number }>({
      query: ({ page, limit }) => `/posts?_page=${page}&_limit=${limit}&_sort=id&_order=desc`,
      transformResponse: (response: any[], meta) => {
        const totalCount = parseInt(meta?.response?.headers.get('x-total-count') || '0', 10);

        const posts = response.map(post => ({
          ...post,
          author: `Author ${post.userId}`,
          excerpt: post.body.substring(0, 100) + '...'
        }));

        return { posts, totalCount };
      },
      providesTags: ['Posts'],
    }),

    getPost: builder.query<BlogPost, number>({
      query: (id) => `/posts/${id}`,
      transformResponse: (response: any) => ({
        ...response,
        author: `Author ${response.userId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    addPost: builder.mutation<BlogPost, NewBlogPost>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...newPost,
          userId: 1,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled;
          dispatch(blogApi.util.invalidateTags(['Posts']));
        } catch (error) {
          console.error('Error adding post:', error);
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = blogApi;