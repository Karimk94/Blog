'use client';

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { BlogPost } from '../../types';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
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
                <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Read More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default BlogCard;