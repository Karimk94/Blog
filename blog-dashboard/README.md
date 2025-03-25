Blog Dashboard
A simple blog dashboard built with Next.js, Material-UI, TypeScript, and RTK Query.
Features

Server-side rendered blog post list
Dynamic routing for individual blog posts
Responsive UI using Material-UI components
Type-safe code with TypeScript
Efficient API data fetching with RTK Query
Add new blog posts with form validation

Getting Started
Prerequisites

Node.js 14.x or later
npm or yarn

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/blog-dashboard.git
cd blog-dashboard

Install dependencies:

bashCopynpm install
# or
yarn install

Start the development server:

bashCopynpm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

Project Structure

/components: Reusable UI components

/Layout: Layout components
/BlogList: Blog list components
/BlogPost: Blog post components
/Forms: Form components


/pages: Next.js pages

/index.tsx: Blog list page
/posts/[id].tsx: Blog post detail page
/posts/new.tsx: New post form page


/store: Redux store and RTK Query setup
/types: TypeScript interfaces
/theme: Material-UI theme configuration

Technology Stack

Next.js: React framework for server-side rendering and static site generation
Material-UI: React UI component library
TypeScript: Static type checking
Redux Toolkit: State management
RTK Query: Data fetching and caching

API
The application uses JSONPlaceholder as a mock API for demonstration purposes.
Design Decisions
Server-Side Rendering
Chose to use SSR for the blog post detail pages to improve SEO and initial load performance.
Material-UI
Used Material-UI for a consistent design system and responsive layout. The theming system allows for easy customization of the application's appearance.
RTK Query
Implemented RTK Query for efficient API data fetching, caching, and automatic refetching. This simplifies state management for API calls and handles loading and error states automatically.
TypeScript
Used TypeScript for type safety throughout the application, improving developer experience and reducing runtime errors.