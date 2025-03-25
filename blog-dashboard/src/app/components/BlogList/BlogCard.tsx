import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { BlogPost } from '../../types';
import Link from 'next/link';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    by {post.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/posts/${post.id}`} passHref>
                    <Button size="small" color="primary" component="a">
                        Read More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default BlogCard;