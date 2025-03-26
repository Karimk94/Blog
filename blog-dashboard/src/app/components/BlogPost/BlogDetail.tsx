'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Button, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLocalPosts } from '../../lib/localStoragePosts';
import { useGetPostQuery } from '../../lib/redux/features/blogApi';
import { BlogPost } from '../../types';

interface BlogDetailProps {
    postId: number;
}

const BlogDetail = ({ postId }: BlogDetailProps) => {
    const [localPost, setLocalPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    const skipApiCall = postId < 0;
    const {
        data: apiPost,
        isLoading: isApiLoading,
        isError: isApiError
    } = useGetPostQuery(postId, {
        skip: skipApiCall
    });

    useEffect(() => {
        const localPosts = getLocalPosts();
        const foundPost = localPosts.find(post => post.id === postId);

        if (foundPost) {
            setLocalPost(foundPost);
        }

        setLoading(false);
    }, [postId]);

    const isLoading = skipApiCall ? loading : isApiLoading;
    const isError = skipApiCall ? !localPost : isApiError;
    const post = localPost || apiPost;
    const isLocalPost = (post?.id ?? 0) < 0 || post?.isLocal;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !post) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Post not found. It may have been deleted or is unavailable.
            </Alert>
        );
    }

    return (
        <Box>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                >
                    Back to Posts
                </Button>
            </Link>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    border: isLocalPost ? '1px solid #2196f3' : 'none',
                    position: 'relative'
                }}
            >
                {isLocalPost && (
                    <Chip
                        icon={<AddCircleIcon />}
                        label="New"
                        color="primary"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                        }}
                    />
                )}
                <Typography variant="h4" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    by {post.author}
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" paragraph>
                        {post.body}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default BlogDetail;