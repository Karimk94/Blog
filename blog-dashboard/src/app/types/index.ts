export interface BlogPost {
    id: number;
    title: string;
    body: string;
    author: string;
    excerpt?: string;
    userId?: number;
  }
  
  export interface NewBlogPost {
    title: string;
    body: string;
    author: string;
  }
  
  export interface ApiError {
    status: number;
    data: any;
  }