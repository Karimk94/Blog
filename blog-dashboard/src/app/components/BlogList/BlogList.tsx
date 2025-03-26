'use client';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, CircularProgress, Grid, IconButton, InputAdornment, Pagination, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLocalPosts } from '../../lib/localStoragePosts';
import { useGetPostsQuery } from '../../lib/redux/features/blogApi';
import { BlogPost } from '../../types';
import BlogCard from './BlogCard';

const POSTS_PER_PAGE = 10;

const BlogList = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [showingSearchResults, setShowingSearchResults] = useState(false);

    const {
        data,
        isLoading,
        isError
    } = useGetPostsQuery({
        page,
        limit: POSTS_PER_PAGE
    });

    // Load local posts on component mount
    useEffect(() => {
        setLocalPosts(getLocalPosts());
    }, []);

    // Handle search filtering
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPosts([]);
            setShowingSearchResults(false);
            return;
        }

        setShowingSearchResults(true);

        // Get all posts from API and local storage
        const apiPosts = data?.posts || [];
        const allPosts = [...localPosts, ...apiPosts];

        // Filter posts based on search term
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Remove duplicates (posts with the same id)
        const uniqueFiltered = filtered.filter((post, index, self) =>
            index === self.findIndex(p => p.id === post.id)
        );

        setFilteredPosts(uniqueFiltered);
    }, [searchTerm, data?.posts, localPosts]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    // Determine which posts to display
    const getDisplayedPosts = () => {
        if (showingSearchResults) {
            return filteredPosts;
        }

        if (!data) return [];

        // If on first page, merge local posts with API posts
        if (page === 1) {
            const apiPosts = data.posts || [];

            // Combine local and API posts, ensuring no duplicates
            const combinedPosts = [...localPosts, ...apiPosts];

            // Remove duplicates (posts with the same id)
            const uniquePosts = combinedPosts.filter((post, index, self) =>
                index === self.findIndex(p => p.id === post.id)
            );

            // Return first POSTS_PER_PAGE posts
            return uniquePosts.slice(0, POSTS_PER_PAGE);
        }

        // For other pages, just return API posts
        return data.posts || [];
    };

    const displayedPosts = getDisplayedPosts();

    if (isLoading && !showingSearchResults) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError && !showingSearchResults) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Failed to load blog posts. Please try again later.
            </Alert>
        );
    }

    const totalCount = showingSearchResults
        ? filteredPosts.length
        : (data?.totalCount || 0) + localPosts.length;

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    {showingSearchResults ? 'Search Results' : 'Latest Blog Posts'}
                </Typography>

                <TextField
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ width: '300px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={clearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {displayedPosts.length === 0 ? (
                <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6">
                        {showingSearchResults
                            ? 'No matching posts found'
                            : 'No posts found'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {showingSearchResults
                            ? 'Try a different search term'
                            : 'Create your first post to get started!'}
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {displayedPosts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4}>
                                <BlogCard post={post} />
                            </Grid>
                        ))}
                    </Grid>

                    {!showingSearchResults && totalPages > 1 && (
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