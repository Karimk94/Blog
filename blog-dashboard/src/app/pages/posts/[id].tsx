import { Box } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import BlogDetail from '../../components/BlogPost/BlogDetail';

interface PostDetailProps {
    postId: number;
}

const PostDetail: NextPage<PostDetailProps> = ({ postId }) => {
    const router = useRouter();

    // If the page is still being generated via SSR, show loading
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ my: 4 }}>
            <BlogDetail postId={postId} />
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params || {};

    // Validate that the ID is a number
    const postId = Number(id);

    if (isNaN(postId)) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            postId,
        },
    };
};

export default PostDetail;