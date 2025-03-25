import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useGetPostsQuery } from '../../store/api/blogApi';
import BlogCard from './BlogCard';

const BlogList: React.FC = () => {
    const { data: posts, isLoading, isError } = useGetPostsQuery();

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

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Latest Blog Posts
            </Typography>
            <Grid container spacing={4}>
                {posts?.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <BlogCard post={post} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default BlogList;