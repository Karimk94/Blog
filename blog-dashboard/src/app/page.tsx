'use client';

import { useSearchParams } from 'next/navigation';
import BlogList from './components/BlogList/BlogList';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const page = isClient ? parseInt(searchParams.get('page') || '1', 10) : 1;

  return (
    <Box sx={{ my: 4 }}>
      <BlogList key={`page-${page}`} />
    </Box>
  );
}