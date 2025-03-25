import { ReactNode } from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Button, CssBaseline } from '@mui/material';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Blog Dashboard
                        </Typography>
                    </Link>
                    <Link href="/posts/new" passHref>
                        <Button color="inherit" component="a">
                            New Post
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box component="main">
                    {children}
                </Box>
            </Container>
        </>
    );
};

export default Layout;