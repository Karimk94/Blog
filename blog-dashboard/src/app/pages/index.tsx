import { Box } from '@mui/material';
import type { NextPage } from 'next';
import BlogList from '../components/BlogList/BlogList';

const Home: NextPage = () => {
    return (
        <Box sx={{ my: 4 }}>
            <BlogList />
        </Box>
    );
};

export default Home;