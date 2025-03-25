import { Box } from '@mui/material';
import type { NextPage } from 'next';
import NewPostForm from '../../components/Forms/NewPostForm';

const NewPost: NextPage = () => {
    return (
        <Box sx={{ my: 4 }}>
            <NewPostForm />
        </Box>
    );
};

export default NewPost;