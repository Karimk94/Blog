'use client';

import { Alert, Box, Button, CircularProgress, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createLocalPost } from '../../lib/localStoragePosts';
import { useAddPostMutation } from '../../lib/redux/features/blogApi';
import { NewBlogPost } from '../../types';

const NewPostForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<NewBlogPost>({
        title: '',
        body: '',
        author: '',
    });
    const [errors, setErrors] = useState({
        title: false,
        body: false,
        author: false,
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [addPost, { isLoading }] = useAddPostMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const validate = (): boolean => {
        const newErrors = {
            title: formData.title.trim() === '',
            body: formData.body.trim() === '',
            author: formData.author.trim() === '',
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const result = await addPost(formData).unwrap();

            createLocalPost(formData);

            setOpenSnackbar(true);

            setFormData({ title: '', body: '', author: '' });

            setTimeout(() => {
                router.push('/');
            }, 1500);
        } catch (error) {
            console.error('Failed to add post:', error);

            createLocalPost(formData);
            setOpenSnackbar(true);

            setFormData({ title: '', body: '', author: '' });

            setTimeout(() => {
                router.push('/');
            }, 1500);
        }
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Create New Blog Post
            </Typography>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                        helperText={errors.title ? 'Title is required' : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="author"
                        label="Author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        error={errors.author}
                        helperText={errors.author ? 'Author is required' : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="body"
                        label="Content"
                        name="body"
                        multiline
                        rows={8}
                        value={formData.body}
                        onChange={handleChange}
                        error={errors.body}
                        helperText={errors.body ? 'Content is required' : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isLoading ? 'Publishing...' : 'Publish Post'}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Blog post successfully published! Redirecting to home page...
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewPostForm;