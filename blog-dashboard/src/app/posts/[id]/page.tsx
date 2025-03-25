import { Box } from '@mui/material';
import BlogDetail from '../../components/BlogPost/BlogDetail';

interface PostDetailPageProps {
    params: {
        id: string;
    };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const postId = parseInt(params.id, 10);

    return (
        <Box sx={{ my: 4 }}>
            <BlogDetail postId={postId} />
        </Box>
    );
}