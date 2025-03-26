'use client';

import { BlogPost, NewBlogPost } from '../types';

const LOCAL_POSTS_KEY = 'blog_dashboard_posts';

export const getLocalPosts = (): BlogPost[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const postsJson = localStorage.getItem(LOCAL_POSTS_KEY);
        return postsJson ? JSON.parse(postsJson) : [];
    } catch (error) {
        console.error('Error getting posts from localStorage:', error);
        return [];
    }
};

export const saveLocalPost = (post: BlogPost): void => {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const existingPosts = getLocalPosts();
        const updatedPosts = [post, ...existingPosts];
        localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(updatedPosts));
    } catch (error) {
        console.error('Error saving post to localStorage:', error);
    }
};

export const createLocalPost = (newPost: NewBlogPost): BlogPost => {
    const existingPosts = getLocalPosts();

    const newId = existingPosts.length > 0
        ? Math.min(...existingPosts.map(p => p.id)) - 1
        : -1;

    const createdPost: BlogPost = {
        id: newId,
        title: newPost.title,
        body: newPost.body,
        author: newPost.author,
        excerpt: newPost.body.substring(0, 100) + '...',
    };

    saveLocalPost(createdPost);
    return createdPost;
};