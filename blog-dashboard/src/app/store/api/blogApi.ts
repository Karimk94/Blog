import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BlogPost, NewBlogPost } from '../../types';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<BlogPost[], void>({
            query: () => '/posts',
            transformResponse: (response: any[]) =>
                response.slice(0, 10).map(post => ({
                    ...post,
                    author: `Author ${post.userId}`, // Mock author data
                    excerpt: post.body.substring(0, 100) + '...'
                })),
            providesTags: ['Posts'],
        }),
        getPost: builder.query<BlogPost, number>({
            query: (id) => `/posts/${id}`,
            transformResponse: (response: any) => ({
                ...response,
                author: `Author ${response.userId}`, // Mock author data
            }),
            providesTags: (result, error, id) => [{ type: 'Posts', id }],
        }),
        addPost: builder.mutation<BlogPost, NewBlogPost>({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...newPost,
                    userId: 1, // Mock user ID
                },
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = blogApi;