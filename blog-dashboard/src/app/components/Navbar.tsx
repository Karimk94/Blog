'use client';

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'white'
                        }}
                    >
                        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                            Blog Dashboard
                        </Link>
                    </Typography>
                    <Link href="/posts/new" style={{ textDecoration: 'none' }}>
                        <Button color="inherit">
                            New Post
                        </Button>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;