import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Container from './components/Container';
import Navbar from './components/Navbar';
import { ReduxProvider } from './lib/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog Dashboard',
  description: 'A simple blog dashboard built with Next.js, Material-UI, TypeScript, and RTK Query',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <main>
            <Container>
              {children}
            </Container>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}