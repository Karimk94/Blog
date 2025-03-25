# Blog Dashboard

A simple blog dashboard built with Next.js (App Router), Material-UI, TypeScript, and RTK Query.

## Features

- Server-side rendered blog post list
- Dynamic routing for individual blog posts
- Responsive UI using Material-UI components
- Type-safe code with TypeScript
- Efficient API data fetching with RTK Query
- Add new blog posts with form validation

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-dashboard.git
cd blog-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- **`/src/app`**: Next.js App Router
  - `/page.tsx`: Home page (blog list)
  - `/posts/[id]/page.tsx`: Blog post detail page
  - `/posts/new/page.tsx`: New post form page
- **`/src/components`**: Reusable UI components
  - `/BlogList`: Blog list components
  - `/BlogPost`: Blog post components
  - `/Forms`: Form components
- **`/src/lib/redux`**: Redux store and RTK Query setup
- **`/src/types`**: TypeScript interfaces
- **`/src/theme`**: Material-UI theme configuration

## Technology Stack

- **Next.js**: React framework with the new App Router
- **Material-UI**: React UI component library
- **TypeScript**: Static type checking
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching

## API

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock API for demonstration purposes.

## Design Decisions

### App Router
This project uses Next.js 14's App Router pattern, which is the recommended approach for new Next.js applications. The App Router provides improved routing capabilities, layouts, and server components.

### Client and Server Components
While the App Router supports server components, this implementation primarily uses client components (with the 'use client' directive) to ensure compatibility with Redux and React hooks.

### Material-UI
Used Material-UI for a consistent design system and responsive layout. The theming system allows for easy customization of the application's appearance.

### RTK Query
Implemented RTK Query for efficient API data fetching, caching, and automatic refetching. This simplifies state management for API calls and handles loading and error states automatically.

### TypeScript
Used TypeScript for type safety throughout the application, improving developer experience and reducing runtime errors.

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify.