import { Typography, Box, Paper, CircularProgress, Alert, Button } from '@mui/material';
import { useGetPostQuery } from '../../store/api/blogApi';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BlogDetailProps {
    postId: number;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ postId }) => {
    const { data: post, isLoading, isError } = useGetPostQuery(postId);

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
                Failed to load blog post. Please try again later.
            </Alert>
        );
    }

    return (
        <Box>
            <Link href="/" passHref>
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 2 }}
                    component="a"
                >
                    Back to Posts
                </Button>
            </Link>
            <Paper elevation={2} sx={{ p: 3 }}>
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