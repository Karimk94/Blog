'use client';

import { useGetPostsQuery } from '../../lib/redux/features/blogApi';
import { Alert, Box, CircularProgress, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import BlogCard from './BlogCard';

const POSTS_PER_PAGE = 10;

const BlogList = () => {
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError
    } = useGetPostsQuery({
        page,
        limit: POSTS_PER_PAGE
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Failed to load blog posts. Please try again later.
            </Alert>
        );
    }

    const { posts, totalCount } = data || { posts: [], totalCount: 0 };
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Latest Blog Posts
            </Typography>

            {posts.length === 0 ? (
                <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6">No posts found</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Create your first post to get started!
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {posts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4}>
                                <BlogCard post={post} />
                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                            <Typography variant="body2" color="text.secondary">
                                Page {page} of {totalPages} ({totalCount} posts total)
                            </Typography>
                        </Stack>
                    )}
                </>
            )}
        </>
    );
};

export default BlogList;