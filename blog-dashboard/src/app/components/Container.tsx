'use client';

import { Container as MuiContainer } from '@mui/material';
import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <MuiContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
        </MuiContainer>
    );
}