'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import EmotionRegistry from './EmotionRegistry';
import theme from './index';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </EmotionRegistry>
  );
}