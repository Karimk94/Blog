'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import Link from 'next/link';
import { BlogPost } from '../../types';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    const isLocalPost = post.id < 0 || post.isLocal;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: isLocalPost ? '1px solid #2196f3' : 'none',
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
                        top: 12,
                        right: 12,
                        zIndex: 1,
                    }}
                />
            )}
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
                <Link
                    href={`/posts/${post.id}`}
                    style={{ textDecoration: 'none' }}
                    passHref
                >
                    <Button size="small" color="primary">
                        Read More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default BlogCard;